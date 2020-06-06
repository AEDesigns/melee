import React from 'react';


const CardStack = (props) => {
    console.log(props.cardStack)
    return (
    <div>
        <pre>
           {props.cardStack.card.name} {props.cardStack.quantity} {props.cardStack.id}
        </pre>
    </div>  
    );
}
 
export default CardStack;