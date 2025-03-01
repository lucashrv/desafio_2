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
            return res.status(500).json({ error: err.message });
        }
    }
}

export default StoresController;
