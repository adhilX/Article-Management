import { Response } from "express";

export const setCookie = (res: Response, value: string, maxAge: number) => {
       res.cookie("refreshToken", value, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: maxAge,
       });
}