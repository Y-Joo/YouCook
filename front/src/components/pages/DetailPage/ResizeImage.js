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
        <div style={{   backgroundImage: `url(${props.srcUrl})`,
                        width: '350px',
                        height: '197.1px',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover' }}>
        </div>
    )
}

export default ResizeImage
