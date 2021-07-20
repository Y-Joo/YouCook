import React from 'react'
import { Chip } from '@material-ui/core';

function IngredientChip(props) {
    const ingredientChips = props.ingredientData.map((ingredient, index) => (
        <>
            <Chip variant="outlined" size="small" label={ingredient} style={{margin: '0.15rem'}}/>
        </>
    ))
    
    return (
        <div>
            {ingredientChips}
        </div>
    )
}

export default IngredientChip
