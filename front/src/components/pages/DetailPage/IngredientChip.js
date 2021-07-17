import React from 'react'
import { Chip } from '@material-ui/core';

function IngredientChip(props) {
    const ingredientChips = props.ingredientData.map((ingredient, index) => (
        <>
            <Chip variant="outlined" size="small" label={ingredient} style={{margin: '0.1rem'}}/>
        </>
    ))
    
    return (
        <div style={{padding: '1rem'}}>
            {ingredientChips}
        </div>
    )
}

export default IngredientChip
