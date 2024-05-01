// utils/authTokens.ts
import jwt, { Secret } from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}

const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as Secret);
};

export { generateAccessToken, generateRefreshToken };
export type { TokenPayload };
