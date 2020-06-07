import React from 'react';
import Card from './Card';

const CardStack = (props) => {
    const renderCards = () => {
        const cardsToRender = [];
        for(var i = 1; i < props.cardStack.quantity; i++){
            cardsToRender.push(<Card card={props.cardStack.card} removeCard={props.removeCard} key={i} addCard={props.addCard} style={{
                padding: `${i * 30}` + 'px'
            }}/>)
        }
        return cardsToRender
    }
    return (
    <div style={{position: "relative"}}>
        {renderCards()}
    </div>  
    );
}
 
export default CardStack;