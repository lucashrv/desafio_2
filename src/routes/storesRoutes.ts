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
        this.routes.post("/store", (req, res) => {
            this.storesController.create(req, res);
        });
        this.routes.get("/stores", (req, res) => {
            this.storesController.getAll(req, res);
        });
        this.routes.get("/store/:id", (req, res) => {
            this.storesController.getOne(req, res);
        });
        this.routes.get("/stores/:cep", (req, res) => {
            this.storesController.searchNearbyStores(req, res);
        });
        this.routes.put("/store/:id", (req, res) => {
            this.storesController.update(req, res);
        });
        this.routes.delete("/store/:id", (req, res) => {
            this.storesController.delete(req, res);
        });

        return this.routes;
    }
}

export default StoresRoutes;
