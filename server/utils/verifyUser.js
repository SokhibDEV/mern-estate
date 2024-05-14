import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import { useTranslation } from "react-i18next";

export const verifyToken = (req, res, next) => {
  const { t } = useTranslation();
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, t("unauthorized")));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, t("forbidden")));
    req.user = user;
    next();
  });
};
