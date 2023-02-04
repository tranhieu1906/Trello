import userRoutes from "./user.router";
import authRoutes from "./auth.router";
import commentRoutes from "./comment.router"
import Token from "../middlewares/jwt.middleware"

function route(app) {
    app.use("/auth", authRoutes);
    app.use(Token.veryfyAccessToken);
    app.use("/users", userRoutes);
    app.use("/comments", commentRoutes)


}

export default route;