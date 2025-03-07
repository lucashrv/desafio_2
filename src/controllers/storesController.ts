import { Request, Response } from "express";
import StoresServices from "../services/stores/storesServices";
import logger from "../utils/logger";

class StoresController {
    private storesServices: StoresServices;

    public constructor() {
        this.storesServices = new StoresServices();
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const store = await this.storesServices.create(req.body);

            logger.info("Loja criada com sucesso!", { _id: store._id });

            return res.status(201).json({
                message: "Loja criada com sucesso!",
                data: store,
            });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;

            logger.error("Erro ao criar loja", {
                error: err.message,
                statusCode,
            });

            return res
                .status(statusCode)
                .json({ message: "Erro ao criar loja", error: err.message });
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const stores = await this.storesServices.getAll();

            logger.info(`Sucesso ao pesquisar ${stores.length} lojas`);

            return res
                .status(200)
                .json({ message: "Sucesso ao pesquisar lojas", data: stores });
        } catch (err: any) {
            logger.error("Erro ao pesquisar lojas", {
                error: err.message,
                statusCode: 500,
            });

            return res.status(500).json({
                message: "Erro ao pesquisar lojas",
                error: err.message,
            });
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const store = await this.storesServices.getOne(req.params.id);

            logger.info("Sucesso ao pesquisar loja");

            return res
                .status(200)
                .json({ message: "Sucesso ao pesquisar loja", data: store });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;

            logger.error("Erro ao pesquisar loja", {
                error: err.message,
                statusCode,
            });

            return res.status(statusCode).json({
                message: "Erro ao pesquisar loja",
                error: err.message,
            });
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

            if (!stores.length) {
                logger.info(
                    "Não há lojas em um raio de 100km do CEP informado",
                    { cep: req.params.cep },
                );

                return res.status(200).json({
                    message: `Não há lojas em um raio de 100km do CEP informado`,
                });
            }

            logger.info(
                `Há ${stores.length} lojas em um raio de 100km do CEP informado`,
            );

            return res.status(200).json({
                message: `Há ${stores.length} lojas em um raio de 100km do CEP informado`,
                data: stores,
            });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;

            logger.error("Erro ao pesquisar lojas próximas", {
                error: err.message,
                statusCode,
            });

            return res.status(statusCode).json({
                message: "Erro ao pesquisar lojas próximas",
                error: err.message,
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const store = await this.storesServices.update(
                req.params.id,
                req.body,
            );

            logger.info("Loja atualizada com sucesso", { _id: req.params.id });

            return res
                .status(200)
                .json({ message: "Loja atualizada com sucesso", data: store });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;

            logger.error("Erro ao atualizar loja", {
                error: err.message,
                statusCode,
            });

            return res.status(statusCode).json({
                message: "Erro ao atualizar loja",
                error: err.message,
            });
        }
    }
    public async delete(req: Request, res: Response) {
        try {
            await this.storesServices.delete(req.params.id);

            logger.info("Loja deletada com sucesso", { _id: req.params.id });

            return res
                .status(200)
                .json({ message: "Loja deletada com sucesso", data: null });
        } catch (err: any) {
            const statusCode: number = err.statusCode || 500;

            logger.error("Erro ao deletar loja", {
                error: err.message,
                statusCode,
            });

            return res.status(statusCode).json({
                message: "Erro ao deletar loja",
                error: err.message,
            });
        }
    }
}

export default StoresController;
