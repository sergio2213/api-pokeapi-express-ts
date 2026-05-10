export class AppError extends Error {
  public status: number;
  constructor(status: number = 500, message: string = "Internal Server Error") {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}
