import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import ResizeImage from './ResizeImage'
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
            <RecipeList recipeData={videoData.description ?? []}></RecipeList>
        </div>
        
    )
}

export default DetailPage
