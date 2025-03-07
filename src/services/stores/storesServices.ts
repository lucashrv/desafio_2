import axios from "axios";
import Store, { IStore } from "../../models/Store";
import AppError from "../../utils/AppError";
import calcHaversineDistance from "../../utils/calcHaversineDistance";

class StoresServices {
    public async create(body: IStore) {
        const { name, zip_code, address } = body;

        const cep = zip_code.replace("-", "");

        if (cep.toString().length !== 8 || typeof +cep !== "number")
            throw new AppError("O CEP precisa ser de 8 dígitos numéricos", 422);

        const viaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (viaCep.data.erro) throw new AppError("CEP não encontrado!", 404);

        console.log("ViaCep: ", viaCep.data);

        const nominatim = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${viaCep.data.logradouro},${viaCep.data.bairro},${viaCep.data.localidade},${viaCep.data.uf},Brasil&format=json`,
        );

        if (!nominatim.data[0])
            throw new AppError(
                "Localização não encontrada, confira o CEP e o Número do local!",
                404,
            );

        console.log("Nominatim: ", nominatim.data[0]);

        const store = await Store.create({
            name,
            zip_code: cep,
            address: {
                street: viaCep.data.logradouro,
                number: address.number,
                neighborhood: viaCep.data.bairro,
                city: viaCep.data.localidade,
                state: viaCep.data.uf,
                coordinates: {
                    lat: nominatim.data[0].lat,
                    lng: nominatim.data[0].lon,
                },
            },
        });

        console.log("new store: ", store);

        return store;
    }

    public async getAll() {
        const stores = await Store.find();
        return stores;
    }

    public async getOne(id: string) {
        const store = await Store.findById(id);

        if (!store) throw new AppError("Loja não encontrada!", 404);

        return store;
    }

    public async searchNearbyStores(cep: string) {
        if (!cep) throw new AppError("CEP requerido!", 400);

        const cepFormat = cep.replace("-", "");

        if (cepFormat.toString().length !== 8 || typeof +cepFormat !== "number")
            throw new AppError("O CEP precisa ser de 8 dígitos numéricos", 422);

        const viaCep = await axios.get(
            `https://viacep.com.br/ws/${cepFormat}/json/`,
        );

        if (viaCep.data.erro) throw new AppError("CEP não encontrado!", 404);

        console.log("ViaCep: ", viaCep.data);

        const nominatim = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${viaCep.data.logradouro},${viaCep.data.bairro},${viaCep.data.localidade},${viaCep.data.uf},Brasil&format=json`,
        );

        if (!nominatim.data[0])
            throw new AppError(
                "Localização não encontrada, confira o CEP",
                404,
            );

        console.log("Nominatim: ", nominatim.data[0]);

        const stores = await Store.find();

        const nearbyStores = stores
            .map((store: any) => {
                const distanceToCep = calcHaversineDistance(
                    nominatim.data[0].lat,
                    nominatim.data[0].lon,
                    store.address.coordinates.lat,
                    store.address.coordinates.lng,
                );

                return {
                    ...store._doc,
                    distanceToCep,
                };
            })
            .filter((store) => store.distanceToCep <= 100)
            .sort((a, b) => a.distanceToCep - b.distanceToCep);

        return nearbyStores;
    }

    public async update(id: string, body: Partial<IStore>) {
        const storeExists = await Store.findById(id);

        if (!storeExists) throw new AppError("Loja não encontrada!", 404);

        const store = await Store.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return store;
    }

    public async delete(id: string) {
        const storeExists = await Store.findById(id);

        if (!storeExists) throw new AppError("Loja não encontrada!", 404);

        return await Store.findByIdAndDelete(id);
    }
}

export default StoresServices;
