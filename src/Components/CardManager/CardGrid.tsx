import React, {useEffect, useState} from 'react';
import ScryfallService from "../../Services/StryfallService";
import {AutoComplete, Card, Row, Col} from "antd";
import {ICard} from "../../Interfaces/Scryfall";

function CardGrid() {
    const [cards, setCards] = useState<{ value: string}[]>([]);
    const [card, setCard] = useState<ICard[]>([]);

    const service = new ScryfallService();

    //if card changes
    useEffect(() => {
        service.getCardNames()
            .then(res  => {
                const catalog = res.data;

                setCards(catalog.data.map(name => { return {value: name}; }));
            });
    }, [cards.join(',')]);

    const onSearch = (search: string) => {
        //console.log(search)
    }

    const onSelect = (selected: string) => {
        service.findByExactName(selected)
            .then(res => {
                console.log(res.data)
                const card = res.data;
                service.searchByOracleId(card.oracleId)
                    .then(res => setCard(res.data.data as ICard[]));
            });
    }

    return (
        <React.Fragment>
            <Row>
                <AutoComplete
                    options={cards}
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
            </Row>
            <Row>
                {card.map(version => {return(
                    <Col lg={6}>
                        <Card title={version.name} bordered={false} key={version.id}>
                            <img src={version.imageUris['small']}/>
                        </Card>
                    </Col>)
                })}
            </Row>
        </React.Fragment>
    );
}

export default CardGrid;
