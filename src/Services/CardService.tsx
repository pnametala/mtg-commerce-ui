import BaseService from "./BaseService";
import {ICard, ICatalog, IResultList} from "../Interfaces/Scryfall";
import {CardPrint} from "../Interfaces/Collection/CardPrint";
import {CardCollection} from "../Interfaces/Collection/CardCollection";

export default class CardService extends BaseService {


    constructor() {
        super('/cards');
    }

    latest() {
        return this.httpClient.get<CardPrint[]>('/latest');
    }
}
