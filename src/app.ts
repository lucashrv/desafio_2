import express, { Application } from "express";
import IndexRoutes from "./routes/routes";
import { config } from "dotenv";

config();

class App {
    private app: Application;
    private indexRoutes: IndexRoutes;

    public constructor() {
        this.app = express();
        this.indexRoutes = new IndexRoutes();
        this.routes();
        this.middlewares();
    }

    private middlewares(): void {
        this.app.use(express.json({ limit: "5mb" }));
    }

    private routes(): void {
        this.app.use(this.indexRoutes.init());
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server started`);
        });
    }
}

export default new App();
