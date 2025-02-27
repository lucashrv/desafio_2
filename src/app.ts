import express, { Application } from "express";
import IndexRoutes from "./routes/routes";
import connection from "./database/connection";
import { config } from "dotenv";

config();

class App {
    private app: Application;
    private indexRoutes: IndexRoutes;

    public constructor() {
        this.app = express();
        this.indexRoutes = new IndexRoutes();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.text({ limit: "100mb" }));
        this.app.use(express.urlencoded({ limit: "10mb", extended: true }));
    }

    private routes(): void {
        this.app.use(this.indexRoutes.init());
    }

    public start(port: number): void {
        this.app.listen(port, async () => {
            await connection.start();
            console.log(`Server started`);
            console.log(`Connected to database`);
        });
    }
}

export default new App();
