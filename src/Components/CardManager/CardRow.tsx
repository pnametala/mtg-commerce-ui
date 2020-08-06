import React, {useEffect, useState} from 'react';
import {AutoComplete} from "antd";
import ScryfallService from "../../Services/StryfallService";


interface ICardRowProps {
    cardNames: string[]
    service: ScryfallService
}



function CardRow(props: ICardRowProps) {
    const cardNames = (props.cardNames) ? props.cardNames.map(name => { return {value: name}; }) : []
    const service = props.service;
    const onSearch = (search: string) => {
        //console.log(search)
    }

    const onSelect = (selected: string) => {
        service.findByExactName(selected)
            .then(res => {
                console.log(res.data)
                const card = res.data;
                service.searchByOracleId(card.oracleId)
                    .then(res => console.log(res.data))
            });
    }

    return (
        <AutoComplete
            options={cardNames}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Card database"
            filterOption={(inputValue, option) => {
                if(option === undefined) return false;
                return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            }
        />
    );
}

export default CardRow;
