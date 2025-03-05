import { Request, Response } from "express";
import StoresServices from "../services/stores/storesServices";

class StoresController {
    private storesServices: StoresServices;

    public constructor() {
        this.storesServices = new StoresServices();
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const store = await this.storesServices.create(req.body);

            return res.status(201).json({
                message: "Store criado com sucesso!",
                data: store,
            });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message });
        }
    }

    public async searchNearbyStores(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const stores = await this.storesServices.searchNearbyStores(
                req.params.cep,
            );

            return res.status(200).json({
                message: `Há ${stores.length} lojas em um raio de 100km do cep informado`,
                data: stores,
            });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message });
        }
    }
}

export default StoresController;
