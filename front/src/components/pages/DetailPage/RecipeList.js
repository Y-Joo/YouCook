import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



function RecipeList(props) {
    console.log(props.recipeData);
    const recipeList = props.recipeData.map((recipe, index) => (
        <>
            <ListItemText primary={recipe} />
            <Divider />
        </>
    ))

    return (
        <List component="nav" aria-label="mailbox folders" style={{padding: '1rem'}}>
            {recipeList}
        </List>
    );
}

export default RecipeList
