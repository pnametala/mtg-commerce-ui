export interface ICard extends IScryfallBaseItem
{
    id: string;
    oracleId: string;
    multiverseIds: number[];
    mtgoId: number;
    mtgoFoilId: number;
    uri: string;
    scryfallUri: string;
    printsSearchUri: string;
    rulingsUri: string;
    name: string;
    layout: string;
    convertedManaCost: number;
    typeLine: string;
    oracleText: string;
    manaCost: string;
    power: string;
    toughness: string;
    loyalty: string;
    lifeModifier: string;
    handModifier: string;
    colors: string[];
    colorIndicator: string[];
    colorIdentity: string[];
    allParts: any[];
    cardFaces: ICardFace[];
    legalities: { [key:string]: string };
    reserved: boolean;
    edhrecRank: number;
    set: string;
    setName: string;
    collectorNumber: string;
    setSearchUri: string;
    scryfallSetUri: string;
    imageUris: { [key:string]: string };
    hasHighresImage: boolean;
    reprint: boolean;
    digital: boolean;
    rarity: string;
    flavorText: string;
    artist: string;
    illustrationId: string;
    frame: string;
    fullArt: boolean;
    watermark: string;
    borderColor: string;
    storySpotlightNumber: number;
    storySpotlightUri: string;
    timeshifted: boolean;
    colorshifted: boolean;
    futureshifted: boolean;
    price: IPrice;
    relatedUris: { [key:string]: string };
    retailerUris: { [key:string]: string };
    ToString() : string;
}
export interface ICardFace extends IScryfallBaseItem
{
    name: string;
    manaCost: string;
    typeLine: string;
    oracleText: string;
    colors: string[];
    power: string;
    toughness: string;
    flavorText: string;
    artist: string;
    illustrationId: string;
    imageUris: { [key:string]: string };
}
export interface ICatalog extends IScryfallBaseItem
{
    uri: string;
    totalValues: number;
    data: string[];
}
export interface IError extends IScryfallBaseItem
{
    status: number;
    code: string;
    details: string;
    type: string;
    warnings: string[];
}
export interface IManaCost extends IScryfallBaseItem
{
    cost: string;
    convertedManaCost: number;
    colors: string[];
    isColorless: boolean;
    isMonocolored: boolean;
    isMulticolored: boolean;
}
export interface IPrice extends IScryfallBaseItem
{
    usd: number;
    usdFoil: number;
    eur: number;
    eurFoil: number;
    tix: number;
}
export interface IResultList<T> extends IScryfallBaseItem
{
    totalCards: number;
    hasMore: boolean;
    nextPage: string;
    warnings: string[];
    data: T | T[];
}
export interface IScryfallBaseItem
{
    object: string;
    error: IError;
}
export interface ISet extends IScryfallBaseItem
{
    code: string;
    mtgoCode: string;
    name: string;
    setType: string;
    releaseDate: Date;
    blockCode: string;
    block: string;
    parentSetCode: string;
    card_count: number;
    isDigital: boolean;
    isFoilOnly: boolean;
    iconSvgUri: string;
    ssearchUri: string;
    ToString() : string;
}
export interface ISymbol extends IScryfallBaseItem
{
    text: string;
    looseVariant: string;
    description: string;
    isTransposable: boolean;
    isManaSymbol: boolean;
    convertedManaCost: number;
    appearsInManaCosts: boolean;
    isFunny: boolean;
    colors: string[];
}
