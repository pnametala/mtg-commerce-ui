import React, {useEffect, useState} from 'react';
import {ICard} from "../../Interfaces/Scryfall";
import {CardPrint} from "../../Interfaces/Collection/CardPrint";
import CollectionService from "../../Pages/MyStore/Collection/CollectionService";
import {CardCollection} from "../../Interfaces/Collection/CardCollection";
import {
    Button,
    createStyles,
    Grid,
    MenuItem,
    Paper,
    Select,
    TextField,
    Theme,
    Tooltip, Typography,
    useTheme
} from "@material-ui/core";
import {useStyles} from "./Styles";

export interface ICardDisplayProps {
    card: CardCollection
}

interface IFoilValues {
    value: number;
    name: string;
}

const CardDisplay = (props: ICardDisplayProps) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const cardCollection = props.card;
    const [prints, setPrints] = useState<CardPrint[]>(props.card.prints);

    const printOptions = [
        "NM", "LP", "MP", "HP", "DM"
    ]

    const foilValues: IFoilValues[] = [
        {value: 0, name: 'No'},
        {value: 1, name: 'Yes'}
    ]

    const collectionService = new CollectionService();

    //if card changes

    useEffect(() => {

    }, [prints]);


    const addToCollection = (print: CardPrint) => {
        if(print.price <= 0 || print.stock <= 0 ) return;

        const promise = (print.id === null) ? collectionService.addToCollection(print) : collectionService.updateCollection(print);

        promise.then((res) => {
            console.log(res.data)
            print = res.data;
        });
    }

    const addNew = () => {
        console.log(prints);
        setPrints(oldvalue => [...oldvalue, new CardPrint(cardCollection.scryfallCard, false, 0, 0, 'NM', true)])
    }

    const removeVersion = (print: CardPrint) => {
        const index = prints.indexOf(print);
        console.log(print, index)

        if(index === -1) return;

        const promise = (print.id === null) ? new Promise((resolve) => resolve(true)) : collectionService.deleteCollectionItem(print.id);

        promise.then(() => {
            // remove it
            const copy = prints.slice();
            copy.splice(index, 1)
            setPrints(copy);
        });
    }


    const cardTitle = (card: ICard) => {
        return `${card.name} (${card.set}) - ${card.lang}`
    }

    const onConditionChange = (value: string, print: CardPrint) => {
        print.condition = value;
        addToCollection(print);
    }

    const onStockChange = (value: number, print: CardPrint) => {
        print.stock = value;
        addToCollection(print);
    }

    const onPriceChange = (value: number, print: CardPrint) => {
        print.price = value;
        addToCollection(print);
    }

    const onFoilChange = (value: number, print: CardPrint) => {
        print.isFoil = !!value;
        addToCollection(print);
    }


    return (
        <Paper className={classes.cardCollection}>
            <Grid container spacing={3} className={classes.cardCollectionWrapper}>
                <div className={classes.cardCollectionHeader}>
                    <Typography variant="h5">{cardCollection.scryfallCard.name}</Typography>
                </div>
                <div className={classes.cardCollectionBody}>
                    <div>
                        <img src={cardCollection.scryfallCard.imageUris['small']}/>
                        <div className={classes.suggestedPrice}>
                            <div className={classes.suggestedPriceHeader}>
                                <div><small>TCG Price</small></div>
                                <div><small>TCG Foil</small></div>
                            </div>
                            <div className={classes.suggestedPriceValue}>
                                <div><small>${cardCollection.scryfallCard.prices.usd}</small></div>
                                <div><small>{cardCollection.scryfallCard.prices.usdFoil ? `$${cardCollection.scryfallCard.prices.usdFoil}` : '-'}</small></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="collection-right collection-body">
                            <div className="collection-actions">
                                <Tooltip title="Add new card">
                                    <Button color="primary" onClick={addNew}>Add</Button>
                                </Tooltip>

                            </div>
                            <Grid container xs={12}>
                                <Grid item xs={3}>Quality</Grid>
                                <Grid item xs={3}>Foil</Grid>
                                <Grid item xs={2}>Stock</Grid>
                                <Grid item xs={2}>Price</Grid>
                                <Grid item xs={2}> </Grid>
                            </Grid>
                            {prints.map(print => {
                                return (
                                    <Grid container xs={12}>
                                        <Grid item xs={3}>
                                            <Select
                                                className="collection-input"
                                                defaultValue={print.condition}
                                                onChange={(event) => onConditionChange(event.target.value as string, print)}
                                            >
                                                {printOptions.map(option => {
                                                    return (
                                                        <MenuItem value={option} key={option}>{option}</MenuItem>
                                                    )
                                                })}

                                            </Select>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Select
                                                className="collection-input"
                                                defaultValue={foilValues[0].value}
                                                onChange={event => onFoilChange(event.target.value as number, print)}
                                            >
                                                {foilValues.map(option => {
                                                    return (
                                                        <MenuItem value={option.value} key={option.name}>{option.name}</MenuItem>
                                                    )
                                                })}

                                            </Select>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                className="collection-input"
                                                type="number"
                                                defaultValue={print.stock}
                                                inputProps={{ min: "0", max: "99", step: "1" }}
                                                onChange={value => typeof value === 'number' ? onStockChange(value, print) : null} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                className="collection-input"
                                                type="number"
                                                inputProps={{ min: "0.1", step: "0.1" }}
                                                onChange={value => typeof value === 'number' ? onPriceChange(value, print) : null} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button onClick={() => removeVersion(print)}>-</Button>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Grid>
        </Paper>
    );
}

export default CardDisplay;
