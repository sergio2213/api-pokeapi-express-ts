import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = 500;
  const message = "Internal Server Error";
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: "error",
      code: err.status,
      message: err.message,
    });
  }
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: message,
  });
}
