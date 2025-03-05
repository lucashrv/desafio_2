import axios from "axios";
import Store, { IStore } from "../../models/Store";
import AppError from "../../utils/AppError";

class StoresServices {
    public async create(body: IStore) {
        const { name, zip_code, address } = body;

        const cep = zip_code.replace("-", "");

        const viaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (viaCep.data.erro) throw new AppError("Cep não encontrado!", 404);

        console.log("ViaCep: ", viaCep.data);

        const nominatim = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${viaCep.data.logradouro},${address.number},${viaCep.data.bairro},${viaCep.data.localidade},${viaCep.data.uf},Brasil&format=json`,
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
}

export default StoresServices;
