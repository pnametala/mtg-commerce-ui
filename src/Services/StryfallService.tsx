import BaseService from "./BaseService";
import {IcardNames} from "../Interfaces/Scryfall/Catalog/ICardNames";

export default class ScryfallService extends BaseService {


    constructor() {
        super();
    }


    getCardNames() {
        return this.httpClient.get<IcardNames>('/catalog/card-names')
            .then((res) => {
                console.log(res.data)
            });
    }

}
