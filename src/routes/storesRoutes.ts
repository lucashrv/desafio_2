import { Router } from "express";
import StoresController from "../controllers/storesController";

class StoresRoutes {
    private routes: Router;
    private storesController: StoresController;

    public constructor() {
        this.routes = Router();

        this.storesController = new StoresController();
    }

    init(): Router {
        this.routes.get("/test", (req, res) => {
            this.storesController.say(req, res);
        });

        return this.routes;
    }
}

export default StoresRoutes;
