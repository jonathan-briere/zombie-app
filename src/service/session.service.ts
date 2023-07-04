import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import SessionModel, { SessionDocument } from "../model/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const createSession = async (userID: string, userAgent: string) => {
  try {
    const session = await SessionModel.create({
      user: userID,
      userAgent,
    });

    return session.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findSession = async (query: FilterQuery<SessionDocument>) =>
  SessionModel.find(query).lean();

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => SessionModel.updateOne(query, update);

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  return signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );
};
