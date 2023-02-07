import userRoutes from "./user.router";
import authRoutes from "./auth.router";
import commentRoutes from "./comment.router"
import cardRoutes from "./cardRouter";
import Token from "../middlewares/jwt.middleware"
import listRouters from "./list.router";

function route(app) {
    app.use("/auth", authRoutes);
    app.use(Token.veryfyAccessToken);
    app.use("/users", userRoutes);
    app.use("/comments", commentRoutes);
    app.use("/card",cardRoutes);
    app.use("/list",listRouters);


}

export default route;
