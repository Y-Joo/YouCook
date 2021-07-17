import React, { useState, useEffect } from 'react';
import ResizeImage from './ResizeImage'
import RecipeList from './RecipeList'
import IngredientChip from './IngredientChip';
import Information from './Information';
import { style } from '@material-ui/system'
import Grid from '@material-ui/core/Grid';

const axios = require('axios');

function DetailPage() {

    const [videoData, setVideoData] = useState({})
    
    useEffect(() => {
        axios.get('http://54.180.16.31:5000/api/search/engagement/eIo2BaE6LxI')
            .then((response) => {
                console.log(response.data.video);
                setVideoData(response.data.video);
            }).catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <Grid  
                item xs={12} 
                style={{  
                            display: 'flex' ,
                            justifyContent: 'center'}}>
                <ResizeImage srcUrl={'https://i.ytimg.com/vi/eIo2BaE6LxI/hqdefault.jpg'}></ResizeImage> 
            </Grid>
            <Grid  
                item xs={12} 
                style={{  
                            display: 'flex' ,
                            justifyContent: 'center'}}>
                <Information></Information>
            </Grid>
            <Grid  
                item xs={12} 
                style={{  
                            display: 'flex' ,
                            justifyContent: 'center'}}>
                <IngredientChip ingredientData={videoData.ingredientsArr ?? []}/>
            </Grid>
            <Grid  
                item xs={12} 
                style={{  
                            display: 'flex' ,
                            justifyContent: 'center'}}>
                <RecipeList recipeData={videoData.description ?? []}/>
            </Grid>
        </div>
        
    )
}

export default DetailPage
