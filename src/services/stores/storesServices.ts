import axios from "axios";
import Store, { IStore } from "../../models/Store";

class StoresServices {
    public async create(body: IStore) {
        const { name, zip_code, address } = body;

        const cep = zip_code.replace("-", "");

        const viaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (viaCep.data.erro) throw new Error("Cep não localizado!");

        console.log("ViaCep: ", viaCep.data);

        const nominatim = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${viaCep.data.logradouro},${address.number},${viaCep.data.bairro},${viaCep.data.localidade},${viaCep.data.uf},Brasil&format=json`,
        );

        if (!nominatim.data[0])
            throw new Error(
                "Localização não encontrada, confira o CEP e o Número!",
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
