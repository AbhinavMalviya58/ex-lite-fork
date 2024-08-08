import { Router } from "express";
import { authRoutes } from "./auth/auth.routes";

export const apisRoutes = (): Router => {
  const router = Router();

  // Initialize Routes
  router.use("/auth", authRoutes());

  return router;
};
