import { Request, Response } from "express";
import StoresServices from "../services/stores/storesServices";

class StoresController {
    private storesServices: StoresServices;

    public constructor() {
        this.storesServices = new StoresServices();
    }

    public say(req: Request, res: Response): Response {
        try {
            const hello: string = this.storesServices.say();

            return res.status(200).json({ say: hello });
        } catch (err: any) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default StoresController;
