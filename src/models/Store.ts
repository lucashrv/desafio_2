import { Document, Schema, model } from "mongoose";
import { validation as v } from "./../utils/validationMessages";

export interface IStore extends Document {
    name: string;
    address: {
        zip_code: string;
        street: string;
        number: string | number;
        neighborhood: string;
        city: string;
        state: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
}

const StoreSchema = new Schema<IStore>(
    {
        name: { type: String, required: [true, v.required("name")] },
        address: {
            zip_code: {
                type: String,
                required: [true, v.required("zip_code")],
                maxlength: [8, v.maxlength("zip_code", 8)],
            },
            street: {
                type: String,
                required: [true, v.required("street")],
            },
            number: { type: String, required: [true, v.required("number")] },
            neighborhood: {
                type: String,
                required: [true, v.required("neighborhood")],
            },
            city: { type: String, required: [true, v.required("city")] },
            state: { type: String, required: [true, v.required("state")] },
            coordinates: {
                lat: {
                    type: Number,
                    required: [true, v.required("coordinates.lat")],
                },
                lng: {
                    type: Number,
                    required: [true, v.required("coordinates.lng")],
                },
            },
        },
    },
    {
        timestamps: true,
    },
);

const Store = model<IStore>("Store", StoreSchema);

export default Store;
