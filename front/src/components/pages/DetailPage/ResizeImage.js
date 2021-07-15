import React from 'react'

{/* <div style={{ maxHeight: '269px', overflow: 'hidden' }}>
                    <div style={{ width: '100%'}}>
                        <img src={props.srcUrl} 
                            style={{ 
                                    borderRadius: '15px',
                                    maxHeight: 'initial',
                                    marginTop: '-46px' }}></img>
                    </div>
        </div> */}


function ResizeImage(props) {

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ height: '300px'}}></div>
            <img style={{ position: 'absolute'}} src={props.srcUrl}/>
            <div></div>
        </div>
        
    )
}

export default ResizeImage
