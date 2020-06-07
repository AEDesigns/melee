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
    <div>
        <div style={{position: "relative"}}>
            <div style={{display: "block", position: "relative"}}>
            {renderCards()}
            </div>
        </div> 
    </div> 
    );
}
 
export default CardStack;