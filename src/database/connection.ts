import mongoose, { Mongoose } from "mongoose";

class Connection {
    async start(): Promise<Mongoose> {
        return await mongoose.connect(process.env.MONGODB_URL as string);
    }
}

export default new Connection();
