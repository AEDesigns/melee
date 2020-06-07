import React from 'react';
import mtgCardBack from "./images/mtgCardBack.png"

const Card = (props) => {

    const imageOrFallback = props.card.imageUrl || mtgCardBack; 
    
    return (
        <div style={{position: 'absolute', border: "solid 2px blue"}}>
            <img src={imageOrFallback} alt={props.card.name} style={{
                borderRadius: 10,
                width: "148.6666666667px",
                height: "207.3333333333px",
                paddingTop: props.style.padding
            }}/>
        <div>
            {props.card.name}<br/>
            <button onClick={() => props.addCard(props.card)}>+</button>
            {props.removeCard && <button onClick={() => props.removeCard()}>-</button>}
        </div>
        </div>
     );
}
 
export default Card;