import React from 'react'
import VerticalList from './VerticalList'
import ResizeImage from './ResizeImage'
import { style } from '@material-ui/system'
import Grid from '@material-ui/core/Grid';

function DetailPage() {
    
    return (
        <div>
            <ResizeImage srcUrl={'https://i.ytimg.com/vi/eIo2BaE6LxI/hqdefault.jpg'}></ResizeImage>
            <VerticalList></VerticalList>
        </div>
        
    )
}

export default DetailPage
