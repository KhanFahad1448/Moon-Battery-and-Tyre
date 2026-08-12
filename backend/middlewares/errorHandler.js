export default function errorHandler(err, req, res, next) {
  console.error(err);

  // Multer file-size / file-type errors
  if (err.name === "MulterError" || err.message === "Only image files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  // MongoDB duplicate key error (e.g. two products with the same slug)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "value";
    const value = err.keyValue?.[field];
    return res.status(409).json({
      message: `A record with that ${field} ("${value}") already exists.`,
    });
  }

  // Mongoose schema validation errors (missing/invalid required fields)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(" ") });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Something went wrong on the server",
  });
}