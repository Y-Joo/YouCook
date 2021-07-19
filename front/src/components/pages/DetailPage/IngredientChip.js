import React from 'react'
import { Chip } from '@material-ui/core';

function IngredientChip(props) {
    const ingredientChips = props.ingredientData.map((ingredient, index) => (
        <>
            <Chip variant="outlined" size="small" label={ingredient} style={{margin: '0.15rem'}}/>
        </>
    ))
    
    return (
        <div style={{margin: '0 1rem 0rem 1rem'}}>
            {ingredientChips}
        </div>
    )
}

export default IngredientChip
