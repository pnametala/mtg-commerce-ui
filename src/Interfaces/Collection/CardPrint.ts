import {ICard} from "../Scryfall";

export class CardPrint {
    id: string | null
    scryfallId: string;
    oracleId: string;
    stock: number;
    price: number;
    isFoil: boolean;
    condition: string;
    forSale: boolean;
    scryfallCard: ICard;

    constructor(scryfallCard: ICard, isFoil: boolean, stock: number, price: number, condition: string, forSale: boolean) {
        this.id = null
        this.scryfallId = scryfallCard.id;
        this.oracleId = scryfallCard.oracleId;
        this.stock = stock;
        this.price = price || 0;
        this.condition = condition;
        this.forSale = forSale;
        this.isFoil = isFoil;
        this.scryfallCard = scryfallCard;
    }

}
