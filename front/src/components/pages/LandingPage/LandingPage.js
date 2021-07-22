import './LandingPage.css';
import React, { useState, useEffect } from 'react';
import Card from './CardInSlide'
import Grid from '@material-ui/core/Grid';
import SearchInput from './SearchInput'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Height } from '@material-ui/icons';

const axios = require('axios');

function LandingPage(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "0em",
    responsive: [ // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, // 화면 사이즈 1200px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]

  };
  const [videoData, setVideoData] = useState([])
  useEffect(() => {
    axios.get(`http://54.180.16.31:5000/api/search/sorted`)
        .then((response) => {
            setVideoData(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
  }, [])
  const items = videoData
  const ItemList = items && items .map((item) =>
    (<Card className="card" title={item.title ?? ''} channelTitle={item.channelTitle ?? ''} thumbnails={item.thumbnails ?? ''} description={item.description ?? ''} ingredientsArr={item.ingredientsArr ?? ''} videoId={item.videoId ?? ''}></Card>
    )
  );
  
  return (
    <div> 
      <Grid item xs={12} 
            style={{  display: 'flex' ,
                      justifyContent: 'center',
                      marginTop:'4rem',
                      marginBottom:'2rem',}}>
        <SearchInput props={props}></SearchInput>
      </Grid>
      <Grid item xs={12}
            style={{  display: 'flex' ,
                      justifyContent: 'center'}}>
       🔥Best🔥
      </Grid>
      <Grid className="slide" item xs={12}>
        <Slider {...settings}>
          {ItemList}
        </Slider>
      </Grid>
    </div>
    
  );
}

export default LandingPage;
