import './LandingPage.css';
import React, { useState, useEffect } from 'react';
import Card from './CardInSlide'
import Grid from '@material-ui/core/Grid';
import SearchInput from './SearchInput'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
const axios = require('axios');


function LandingPage(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "4em 1em"
  };
  const [videoData, setVideoData] = useState({})
  useEffect(() => {
    axios.get(`http://54.180.16.31:5000/api/search/sorted`)
        .then((response) => {
            setVideoData(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
  }, [])
  const items = videoData
  console.log(items)
  const ItemList = items && items.map((item) =>
    (<Card className="card" title={item.title} channelTitle={item.channelTitle} thumbnails={item.thumbnails} description={item.description} ingredientsArr={item.ingredientsArr}></Card>
    )
  );
  
  return (
    <div> 
      <Grid item xs={12} 
            style={{  display: 'flex' ,
                      justifyContent: 'center',
                      marginTop:'10rem'}}>
        <SearchInput props={props}></SearchInput>
      </Grid>
      <Grid item xs={12}>
        <Slider {...settings}>
          {ItemList}
        </Slider>
      </Grid>
    </div>
    
  );
}

export default LandingPage;
