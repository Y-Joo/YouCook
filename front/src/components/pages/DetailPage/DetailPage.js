import React, { useState, useEffect } from 'react';
import ResizeImage from './ResizeImage';
import RecipeList from './RecipeList';
import IngredientChip from './IngredientChip';
import Information from './Information';
import Grid from '@material-ui/core/Grid';
const axios = require('axios');

function DetailPage({match}) {

    const [videoData, setVideoData] = useState({})
    
    const videoId = match.params.videoId
    useEffect(() => {
        axios.get(`http://54.180.16.31:5000/api/search/detail/${videoId}`)
            .then((response) => {
                console.log(response.data.video);
                setVideoData(response.data.video);
            }).catch((error) => {
                console.log(error);
            });
    }, [])

    return (
            <Grid  
                item xs={12} 
                style={{  
                    display: 'flex' ,
                    flexDirection: 'column',
                    alignItems: 'center'}}>
                <ResizeImage 
                    srcUrl={videoData.thumbnails ?? ''}
                    style={{textAlign:'center'}} /> 
                <Information 
                    style={{textAlign:'center'}}
                    title={videoData.title ?? ''}
                    channelTitle={videoData.channelTitle ?? ''}
                    viewCount={videoData.viewCount ?? 0}
                    subscriberCount={videoData.subscriberCount ?? 0}
                    likeCount={videoData.likeCount ?? 0} />
                <span style={{textAlign:'center', margin:'1rem 0 0.5rem 0'}}>재료</span>
                <IngredientChip  style={{textAlign:'center'}} ingredientData={videoData.ingredientsArr ?? []}/>
                <span style={{textAlign:'center', margin:'1rem 0 0 0'}}>레시피</span>
                <RecipeList style={{textAlign:'center'}} recipeData={videoData.description ?? []}/>
            </Grid>        
    )
}

export default DetailPage
