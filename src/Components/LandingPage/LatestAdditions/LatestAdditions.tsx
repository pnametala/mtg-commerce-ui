import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import CardService from "../../../Services/CardService";
import {CardPrint} from "../../../Interfaces/Collection/CardPrint";
import HomeDisplay from "../../CardDisplay/HomeDisplay";
import CardDisplay from "../../CardDisplay/CardDisplay";
import {Grid} from "@material-ui/core";

const LatestAdditions = () => {

    const [latest, setLatest]  = useState<CardPrint[]>([])
    const history = useHistory();
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        background: '#364d79',
    };

    const service = new CardService()
    service.latest()
        .then(res => {
            setLatest(res.data);
        })
    return (
        <React.Fragment>
        <Grid container spacing={2}>
        {latest.map(card => {
            return (
                <Grid item xs={4} key={'card-' + card.scryfallCard.id}>
                    <HomeDisplay card={card} />
                </Grid>
            )
        })}
        </Grid>
        </React.Fragment>
    )
};

export default LatestAdditions;
