import Store, { IStore } from "../../models/Store";

class StoresServices {
    public async createStore(body: IStore) {
        const store = await Store.create({
            ...body,
            cep: body.cep.replace("-", ""),
        });

        return store;
    }
}

export default StoresServices;
