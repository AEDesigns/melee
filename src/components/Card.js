import React from 'react';
import mtgCardBack from "./images/mtgCardBack.png"

const Card = (props) => {

    const imageOrFallback = props.card.imageUrl || mtgCardBack; 
    
    return (
        <div>
            <div style={{position: "relative"}}>
            <img src={imageOrFallback} alt={props.card.name} style={{
                borderRadius: 10,
                width: "148.6666666667px",
                height: "207.3333333333px",
                position: 'absolute'
            }}/>
        </div>
        {props.card.name}
        <div style={{whiteSpace: "nowrap"}}>
            <button onClick={() => props.addCard(props.card)}>+</button>
            {props.removeCard && <button onClick={() => props.removeCard()}>-</button>}
        </div>
        </div>
     );
}
 
export default Card;