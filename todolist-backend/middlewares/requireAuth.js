export const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(400).json({ message: "Користувач не авторизований" });
};
