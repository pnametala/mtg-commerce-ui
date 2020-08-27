import BaseService from "../../../Services/BaseService";
import {ICard, ICatalog, IResultList} from "../../../Interfaces/Scryfall";
import {CardPrint} from "../../../Interfaces/Collection/CardPrint";
import {CardCollection} from "../../../Interfaces/Collection/CardCollection";

export default class CollectionService extends BaseService {


    constructor() {
        super('/collection');
    }


    addToCollection(print: CardPrint) {

        return this.httpClient.post<CardPrint>('', print);
    }

    updateCollection(print: CardPrint) {

        return this.httpClient.put<CardPrint>(`/${print.id}`, {
            stock: print.stock,
            price: print.price,
            condition: print.condition,
            isFoil: print.isFoil
        });
    }

    deleteCollectionItem(printId: string) {
        return this.httpClient.delete<boolean>(`/${printId}`);
    }

    getCardsInCollection() {
        return this.httpClient.get<CardCollection[]>('');
    }
}
