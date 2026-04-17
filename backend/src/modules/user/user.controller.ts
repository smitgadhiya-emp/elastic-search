import type { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../common/response";
import * as userService from "./user.service";

export async function createUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name, email, phone, state, city, bio, avatar } =
      req.body as userService.CreateUserProfileInput;
    const profile = await userService.createUserProfile({
      name,
      email,
      phone,
      state,
      city,
      bio,
      avatar,
    });
    successResponse(res, { statusCode: 201, data: profile });
  } catch (err) {
    next(err);
  }
}

export async function getUserProfiles(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const filter = _req.query;
    const profiles = await userService.getUserProfiles(filter);
    successResponse(res, { data: profiles });
  } catch (err) {
    next(err);
  }
}

export async function getUserProfileById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const profile = await userService.getUserProfileById(id);
    if (!profile) {
      errorResponse(res, {
        statusCode: 404,
        message: "User profile not found",
      });
      return;
    }
    successResponse(res, { data: profile });
  } catch (err) {
    next(err);
  }
}

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const body = req.body as userService.UpdateUserProfileInput;
    const profile = await userService.updateUserProfileById(id, body);
    if (!profile) {
      errorResponse(res, {
        statusCode: 404,
        message: "User profile not found",
      });
      return;
    }
    successResponse(res, { data: profile });
  } catch (err) {
    next(err);
  }
}

export async function deleteUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const deleted = await userService.deleteUserProfileById(id);
    if (!deleted) {
      errorResponse(res, {
        statusCode: 404,
        message: "User profile not found",
      });
      return;
    }
    successResponse(res, {
      statusCode: 204,
      message: "User profile deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}
