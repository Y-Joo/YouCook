import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ResizeImage from '../DetailPage/ResizeImage';
import IngredientChip from '../DetailPage/IngredientChip';
import Divider from '@material-ui/core/Divider';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        margin: '10px',
        flex: 1
    },
    thumbnails:{
        textAlign: 'center',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        textAlign: 'left',
    },
    title: {
        fontSize: '18px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    channelTitle: {
        fontSize: '14px',
        color: '#444444',
    },
    ingredient: {
        fontSize: '12px',
        color: '#777777',
        margin: '2px',
    }

}));

export default function MediaControlCard(props) {
    const classes = useStyles();

    return (
        <CardActionArea>
        <div className={classes.root}>
            <div className={classes.thumbnails}>
                <ResizeImage
                className={classes.cover}
                srcUrl={props.thumbnails}
                title="thumbnails"
            />
            </div>
            <div className={classes.details}>
                    <span className={classes.title}>
                        {props.title}<br/>
                    </span>
                    <span className={classes.channelTitle}>
                        {props.channelTitle}<br/>
                    </span>
                    <span className={classes.ingredient}>
                        음식 재료<br/>
                        <IngredientChip ingredientData={props.ingredientsArr ?? []}></IngredientChip>
                    </span>
                <Divider/>
            </div>
        </div>
        </CardActionArea>
    );
}