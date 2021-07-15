import React, { useState, useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const axios = require('axios');

function SearchInput(props) {
    const [inputValue, setInputValue] = useState("")

    const onChangeHandler = (event) => {
        setInputValue(event.target.value)
    }

    const onClickHandler = (props) => {
        axios.post('http://54.180.16.31:5000/api/search/find', {
                word : inputValue
            }).then((response) => {
                console.log(response.data);
                props.props.history.push({
                    pathname: '/result',
                    state: {videoList: response.data}
                });
            }).catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <div style={{ border: '1px solid black', borderRadius: '1rem' }}>
            <InputBase 
                onChange={(e) => onChangeHandler(e)}
                placeholder="레시피를 입력하세요."
                style={{ marginLeft: '1rem' }}/>
            <IconButton type="submit" onClick={() =>onClickHandler(props)}>
                <SearchIcon/>
            </IconButton>
        </div>
    )
}

export default SearchInput
