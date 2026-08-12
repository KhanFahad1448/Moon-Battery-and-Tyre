// Use this instead of `throw new Error(...)` anywhere you need a specific
// HTTP status code (404, 400, 401, etc). Plain Error objects don't carry a
// statusCode, so the error handler falls back to 500 for all of them —
// this class fixes that.
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}