import React from 'react';
import Card from './Card';

const CardStack = (props) => {
    const renderCards = () => {
        const cardsToRender = [];
        for(var i = 1; i < props.cardStack.quantity; i++){
            cardsToRender.push(<Card card={props.cardStack.card} removeCard={props.removeCard} addCard={props.addCard} key={i} style={{
                padding: `${i * 10}` + 'px'
            }}/>)
        }
        return cardsToRender
    }
    return (
    <div style={{width: "155px", height: "10vh", display: "inline-block"}}>
        <div style={{position: "absolute"}}>
            <div style={{position: "absolute"}}>
            {renderCards()}
            </div>
        </div> 
    </div> 
    );
}
 
export default CardStack;