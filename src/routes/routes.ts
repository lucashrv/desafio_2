import { Router } from "express";
import StoresRoutes from "./storesRoutes";

class IndexRoutes {
    private routes: Router;
    private storesRoutes: StoresRoutes;

    constructor() {
        this.routes = Router();
        this.storesRoutes = new StoresRoutes();
    }

    init(): Router {
        this.routes.use("/api", this.storesRoutes.init());

        return this.routes;
    }
}

export default IndexRoutes;
