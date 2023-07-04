import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export const createSessionHandler = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);

  if (!user) return res.send(401).send("Invalid email or password");

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("refreshTokenTtl"),
    }
  );

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const session = await findSession({ user: userId, valid: true });

  return res.send(session);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
