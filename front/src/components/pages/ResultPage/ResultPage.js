import React from 'react'
import Card from './HorizontalCard'
import Header from '../../configs/Header/Header';

function ResultPage(props) {
    //console.log(props.location.state.data);
    const items = props.location.state.data.videoList;
    //console.log(items);

    const onClickHandler = (item) => {
        console.log(item)
        props.history.push({
            pathname: `/detail/${item.videoId}`,
        });
    }

    const ItemList = items && items.map((item, index) => (
        <div className="card" onClick={() =>onClickHandler(item)}>
            <Card 
                title={item.title} 
                channelTitle={item.channelTitle} 
                thumbnails={item.thumbnails} 
                description={item.description} 
                ingredientsArr={item.ingredientsArr}>
            </Card>
        </div>
    ));
    return (
        <div className="page">
            <div className="col">
                {ItemList}
            </div>
        </div>
    );

}
export default ResultPage
