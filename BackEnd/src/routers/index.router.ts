import userRoutes from "./user.router";
import authRoutes from "./auth.router";
import commentRoutes from "./comment.router";
import boardRoutes from "./board.router";
import cardRoutes from "./cardRouter";

import Token from "../middlewares/jwt.middleware";

function route(app) {
  app.use("/auth", authRoutes);
  app.use(Token.veryfyAccessToken);
  app.use("/users", userRoutes);
  app.use("/comments", commentRoutes);
  app.use("/boards", boardRoutes);
  app.use("/card", cardRoutes);
}

export default route;
