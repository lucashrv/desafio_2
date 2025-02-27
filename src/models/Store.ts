import { Document, Schema, model } from "mongoose";
import { validation as v } from "./../utils/validationMessages";

export interface IStore extends Document {
    nome: string;
    cep: string;
    logradouro: string;
    numero: string | number;
    bairro: string;
    estado: string;
    latitude: number;
    longitude: number;
}

const StoreSchema = new Schema<IStore>(
    {
        nome: { type: String, required: [true, v.required("nome")] },
        cep: {
            type: String,
            required: [true, v.required("cep")],
            maxlength: [8, v.maxlength("cep", 8)],
        },
        logradouro: {
            type: String,
            required: [true, v.required("logradouro")],
        },
        numero: { type: String, required: [true, v.required("numero")] },
        bairro: { type: String, required: [true, v.required("bairro")] },
        estado: { type: String, required: [true, v.required("estado")] },
        latitude: { type: Number, required: [true, v.required("latitude")] },
        longitude: { type: Number, required: [true, v.required("longitude")] },
    },
    {
        timestamps: true,
    },
);

const Store = model<IStore>("Store", StoreSchema);

export default Store;
