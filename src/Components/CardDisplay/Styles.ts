import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: {
            display: 'flex',
        },
        cardCollection: {
            margin: theme.spacing(2),
            padding: theme.spacing(4)
        },
        cardCollectionWrapper: {
            display: 'flex',
            flexDirection: 'column'
        },
        cardCollectionHeader: {},
        cardCollectionBody: {
            display: 'flex',
            flexDirection: 'row'
        },
        suggestedPrice: {
            display: 'flex',
            flexDirection: 'column'
        },
        suggestedPriceHeader: {
            display: 'flex',
            justifyContent: 'space-evenly',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        suggestedPriceValue: {
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }),
);
