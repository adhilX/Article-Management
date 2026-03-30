import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
};  