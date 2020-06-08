import React from 'react';

const AddorRemoveCardBtns = (props) => {
    return ( 
        <div style={{whiteSpace: "nowrap"}}>
        <button onClick={() => props.addCard(props.card)}>+</button>
        {props.removeCard && <button onClick={() => props.removeCard()}>-</button>}
    </div>
     );
}
 
export default AddorRemoveCardBtns;