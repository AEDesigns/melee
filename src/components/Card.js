import React from 'react';

const Card = (props) => {
    return ( 
        <img key={props.cards.id} src={props.cards.imageUrl} alt={props.cards.name} style={{
            borderRadius: 10,
            width: "148.6666666667px",
            height: "207.3333333333px"
        }}/>
     );
}
 
export default Card;