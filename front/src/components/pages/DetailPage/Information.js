import React from 'react'
import { Divider, Grid } from '@material-ui/core';
import { VisibilityOutlined, SubscriptionsOutlined, ThumbUpOutlined, TitleOutlined, AccountCircleOutlined } from '@material-ui/icons';

function Information(props) {
    
    return (
        <div>
        
                <div style={{textAlign:'center' ,margin: '0.1rem', fontSize: '1rem'}}>{props.title}</div>
                <div style={{textAlign:'center' ,margin: '0.1rem 0 0.5rem 0', fontSize: '0.8rem'}}>{props.channelTitle}</div>
                {/* <Divider orientation="vertical" flexItem style={{margin: '0 0.7rem 0 0.7rem'}}/>
                <SubscriptionsOutlined style={{marginRight: '0.3rem'}}/>
                <div style={{marginTop: '0.2rem', fontSize: '0.8rem'}}>{props.subscriberCount}</div> */}
            <div style={{display: 'flex',
                        justifyContent:'center'}}>
                <VisibilityOutlined style={{marginRight: '0.3rem'}}/>
                <div style={{marginTop: '0.2rem', fontSize: '0.8rem'}}>{props.viewCount}</div>
  
                <Divider orientation="vertical" flexItem style={{margin: '0 0.7rem 0 0.7rem'}}/>
                <ThumbUpOutlined style={{marginRight: '0.3rem'}}/>
                <div style={{marginTop: '0.2rem', fontSize: '0.8rem'}}>{props.likeCount}</div>
            </div>
        </div>
    )
}



export default Information
