import {ICard} from "../Scryfall";
import {CardPrint} from "./CardPrint";

export interface CardCollection {
    scryfallId: string;
    oracleId: string;
    scryfallCard: ICard;
    prints: CardPrint[];

}
