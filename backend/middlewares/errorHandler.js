// Central error handler — catches errors passed via next(err), thrown in
// async route handlers wrapped with asyncHandler, or thrown by Multer.
export default function errorHandler(err, req, res, next) {
  console.error(err);

  // Multer file-size / file-type errors
  if (err.name === "MulterError" || err.message === "Only image files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Something went wrong on the server",
  });
}
