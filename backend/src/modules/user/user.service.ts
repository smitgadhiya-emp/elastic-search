import type { FilterQuery } from 'mongoose';
import type { IUser } from './user.interface';
import { User } from './user.model';

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
    'name' | 'email' | 'phone' | 'state' | 'city' | 'bio' | 'avatar'
  >
>;

function rethrow(error: unknown): never {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(typeof error === 'string' ? error : 'Operation failed');
}

function omitEmptyStrings<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const v = obj[key];
    if (v !== undefined && v !== '') {
      out[key] = v as T[keyof T];
    }
  }
  return out;
}

export async function createUserProfile(
  data: CreateUserProfileInput
): Promise<IUser> {
  try {
    const doc = await User.create({
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
    return doc;
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
  filter: FilterQuery<IUser> = {}
): Promise<IUser[]> {
  try {
    return await User.find(filter).sort({ createdAt: -1 }).exec();
  } catch (error) {
    rethrow(error);
  }
}

export async function updateUserProfileById(
  id: string,
  data: UpdateUserProfileInput
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
    return await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).exec();
  } catch (error) {
    rethrow(error);
  }
}

export async function deleteUserProfileById(id: string): Promise<boolean> {
  try {
    const result = await User.findByIdAndDelete(id).exec();
    return result !== null;
  } catch (error) {
    rethrow(error);
  }
}
