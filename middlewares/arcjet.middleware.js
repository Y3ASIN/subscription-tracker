import aj from "../config/arcjet";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const fetchRequest = new Request(
      `${req.protocol}://${req.get("host")}${req.originalUrl}`,
      {
        method: req.method,
        headers: new Headers(req.headers),
        body:
          req.method !== "GET" && req.method !== "HEAD"
            ? JSON.stringify(req.body)
            : undefined,
      },
    );

    const decision = await aj.protect(fetchRequest, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too many requests" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot detected" });
      }
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.error("ArcJet Middleware Error:", err);
    next(err);
  }
};

export default arcjetMiddleware;
