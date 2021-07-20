import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ResizeImage from '../DetailPage/ResizeImage';
import IngredientChip from '../DetailPage/IngredientChip';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    },
    thumbnails:{
        textAlign: 'center',
    },
    details: {

        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        textAlign: 'left'
    },

}));

export default function MediaControlCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.thumbnails}>
                <ResizeImage
                className={classes.cover}
                srcUrl={props.thumbnails}
                title="thumbnails"
            />
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.channelTitle}
                    </Typography>
                    <Typography variant="h8">
                        음식 재료<br />
                        <IngredientChip ingredientData={props.ingredientsArr ?? []}></IngredientChip>
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}