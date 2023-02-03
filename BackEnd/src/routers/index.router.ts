import userRoutes from "./user.router";
import authRoutes from "./auth.router";
import Token from "../middlewares/jwt.middleware"

function route(app) {
    app.use("/auth", authRoutes);
    app.use(Token.veryfyAccessToken);
    app.use("/users", userRoutes);


}

export default route;