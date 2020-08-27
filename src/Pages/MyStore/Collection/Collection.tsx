import React, {useEffect, useState} from 'react';
import {CardCollection} from "../../../Interfaces/Collection/CardCollection";
import ScryfallService from "../../../Services/ScryfallService";
import CollectionService from "./CollectionService";
import CardDisplay from "../../../Components/CardDisplay/CardDisplay";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Autocomplete, {AutocompleteRenderGroupParams} from '@material-ui/lab/Autocomplete';
import {ListSubheader, useMediaQuery, useTheme, Typography} from "@material-ui/core";
import {ListChildComponentProps, VariableSizeList} from "react-window";

;

interface ISearch {
    value: string
}


const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    return React.cloneElement(data[index], {
        style: {
            ...style,
            top: (style.top as number) + LISTBOX_PADDING,
        },
    });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: React.ReactNode) => {
        return React.isValidElement(child) && child.type === ListSubheader ? 48 : itemSize;

    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index: number) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

const renderGroup = (params: AutocompleteRenderGroupParams) => [
    <ListSubheader key={params.key} component="div">
        {params.group}
    </ListSubheader>,
    params.children,
];


function Collection() {
    const [cards, setCards] = useState<ISearch[]>([]);
    const [cardCollections, setCardCollections] = useState<CardCollection[]>([]);

    const service = new ScryfallService();
    const collectionService = new CollectionService();

    //if card changes
    useEffect(() => {
        service.getCardNames()
            .then(res  => {
                const catalog = res.data;

                setCards(catalog.data.map(name => { return {value: name}; }));
            });

        collectionService.getCardsInCollection()
            .then(res => {
                setCardCollections(res.data);
            })
    }, [cards.join(',')]);

    const onSelect = (selected: string) => {
        if (selected === '') return;

        service.findByExactName(selected)
            .then(res => {
                console.log(res.data)
                const card = res.data;
                //service.searchByOracleId(card.oracleId)
                //.then(res => setCardPrints(res.data.data as CardPrint[]));
            });
    }

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Autocomplete
                    id="combo-box-demo"
                    disableListWrap
                    options={cards as ISearch[]}
                    getOptionLabel={(option: ISearch) => option.value}
                    style={{ width: 300 }}
                    ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                    renderGroup={renderGroup}
                    onChange={(event, newValue: ISearch | null) => { onSelect(newValue? newValue.value : '') }}
                    renderInput={(params) => <TextField {...params} label="Search for a card" variant="outlined" />}
                    renderOption={(option) => <Typography noWrap>{option.value}</Typography>}
                />
            </Container>
            <div>
                {cardCollections.map(card => {return(
                    <div key={'card-' + card.scryfallCard.id}>
                        <CardDisplay card={card} />
                    </div>)
                })}
            </div>
        </React.Fragment>
    );
}

export default Collection;
