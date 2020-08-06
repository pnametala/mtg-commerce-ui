import BaseService from "./BaseService";
import {ICard, ICatalog, IResultList} from "../Interfaces/Scryfall";

export default class ScryfallService extends BaseService {


    constructor() {
        super();
    }


    getCardNames() {
        return this.httpClient.get<ICatalog>('/catalog/card-names');
    }

    searchByOracleId(id: string) {
        return this.httpClient.get<IResultList<ICard>>(`/cards/search/oracle-id/${id}`);
    }

    findByExactName(name: string) {
        return this.httpClient.get<ICard>(`/cards/name/${name}`);
    }

}
