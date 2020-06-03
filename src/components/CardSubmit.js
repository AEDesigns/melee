import React, {useState} from 'react';
import findCard from '../findCard';
import Card from './Card';
import '../index.css';

const CardSubmit = () => {
    
    const [cardText, setCardText] = useState('');
    const [mtgCards, setMtgCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function submitHandler(e){
        e.preventDefault()
        setIsLoading(true);
        findCard(cardText).then(res => {
            setMtgCards(res.cards)
        }).catch(err => {
            console.error(err)
        }).finally(() => {
            setIsLoading(false);
        })
        //setMtgCards(findCard(cardText))
    }
    
    return ( 
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => setCardText(e.target.value)} value={cardText} />
                <button type="submit">Submit</button>
            </form>
            <div>
                {isLoading && 'Fetching Results'}
                {mtgCards.map((card, index) => <Card cards={card} key={card.id}/>)}
            </div>
        </div>
     );
}
 

export default CardSubmit;