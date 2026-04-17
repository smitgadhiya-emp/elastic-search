import type { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import type { ParsedQs } from "qs";
import type { IUser } from "./user.interface";
import { User } from "./user.model";
import { client } from "../../elastic";
import { userIndex } from "../../elastic/user/user.mapping";

export type CreateUserProfileInput = {
  name: string;
  email: string;
  phone?: string;
  state?: string;
  city?: string;
  bio?: string;
  avatar?: string;
};

export type UpdateUserProfileInput = Partial<
  Pick<
    CreateUserProfileInput,
    "name" | "email" | "phone" | "state" | "city" | "bio" | "avatar"
  >
>;

function rethrow(error: unknown): never {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(typeof error === "string" ? error : "Operation failed");
}

function omitEmptyStrings<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  const out: Partial<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const v = obj[key];
    if (v !== undefined && v !== "") {
      out[key] = v as T[keyof T];
    }
  }
  return out;
}

function pickString(query: ParsedQs, key: string): string | undefined {
  const raw = query[key];
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  if (Array.isArray(raw) && typeof raw[0] === "string") {
    const trimmed = raw[0].trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

function pickPositiveInt(query: ParsedQs, key: string): number | undefined {
  const s = pickString(query, key);
  if (!s) {
    return undefined;
  }
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : undefined;
}

const TEXT_FILTER_FIELDS: Array<{ field: string; fuzzy?: boolean }> = [
  { field: "name", fuzzy: true },
  { field: "email" },
  { field: "bio", fuzzy: true },
  { field: "phone" },
];

const KEYWORD_FILTER_FIELDS = ["state", "city", "avatar"] as const;

function buildUserListMustClauses(query: ParsedQs): QueryDslQueryContainer[] {
  const must: QueryDslQueryContainer[] = [];

  const search = pickString(query, "search");
  if (search) {
    must.push({
      multi_match: {
        query: search,
        fields: ["name^2", "email", "bio", "city", "state", "phone"],
        type: "best_fields",
        fuzziness: "AUTO",
      },
    });
  }

  for (const { field, fuzzy } of TEXT_FILTER_FIELDS) {
    const value = pickString(query, field);
    if (!value) {
      continue;
    }
    must.push({
      match: {
        [field]: fuzzy
          ? { query: value, fuzziness: "AUTO" }
          : { query: value },
      },
    });
  }

  for (const field of KEYWORD_FILTER_FIELDS) {
    const value = pickString(query, field);
    if (!value) {
      continue;
    }
    must.push({ term: { [field]: value } });
  }

  return must;
}

export async function createUserProfile(
  data: CreateUserProfileInput,
): Promise<IUser> {
  try {
    const createdUser = await User.create({
      name: data.name,
      email: data.email,
      ...omitEmptyStrings({
        phone: data.phone,
        state: data.state,
        city: data.city,
        bio: data.bio,
        avatar: data.avatar,
      }),
    });

    // index the user in elasticsearch

    const { _id, ...restData } = createdUser.toObject();

    await client.index({
      index: userIndex,
      id: _id.toString(),
      document: restData,
    });

    return createdUser;
  } catch (error) {
    rethrow(error);
  }
}

export async function getUserProfileById(id: string): Promise<IUser | null> {
  try {
    return await User.findById(id).exec();
  } catch (error) {
    rethrow(error);
  }
}

export async function getUserProfiles(
  query: ParsedQs = {},
): Promise<Record<string, unknown>[]> {
  try {
    const must = buildUserListMustClauses(query);
    const page = pickPositiveInt(query, "page");
    const limit = pickPositiveInt(query, "limit");
    const from =
      page !== undefined && limit !== undefined
        ? (page - 1) * limit
        : undefined;
    const size = limit;

    const result = await client.search({
      index: userIndex,
      from,
      size,
      sort: [{ createdAt: { order: "desc" } }],
      query:
        must.length > 0 ? { bool: { must } } : { match_all: {} },
    });

    const hits = result.hits.hits;
    return hits.map((hit) => {
      const source = (hit._source ?? {}) as Record<string, unknown>;
      return {
        _id: hit._id ?? "",
        ...source,
      };
    });
  } catch (error) {
    rethrow(error);
  }
}

export async function updateUserProfileById(
  id: string,
  data: UpdateUserProfileInput,
): Promise<IUser | null> {
  try {
    const update = omitEmptyStrings({
      name: data.name,
      email: data.email,
      phone: data.phone,
      state: data.state,
      city: data.city,
      bio: data.bio,
      avatar: data.avatar,
    } as Record<string, unknown>);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true },
    ).exec();

    // update the user in elasticsearch
    if (updatedUser) {
      const { _id, ...restData } = updatedUser.toObject();
      await client.index({
        index: userIndex,
        id: _id.toString(),
        document: restData,
      });
    }

    return updatedUser;
  } catch (error) {
    rethrow(error);
  }
}

export async function deleteUserProfileById(id: string): Promise<boolean> {
  try {
    const result = await User.findByIdAndDelete(id).exec();

    // delete the user from elasticsearch
    await client.delete({
      index: userIndex,
      id: id,
    });

    return result !== null;
  } catch (error) {
    rethrow(error);
  }
}
