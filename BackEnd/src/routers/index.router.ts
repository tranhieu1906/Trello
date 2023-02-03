import userRoutes from "./user.router";
import authRoutes from "./auth.router";

function route(app) {
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);





}

export default route;