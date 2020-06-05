import React, {useState, useEffect} from 'react';
import findCard from '../findCard';
import Card from './Card';
import '../index.css';

const CardSubmit = () => {
    
    const [searchText, setSearchText] = useState('');
    const [mtgCards, setMtgCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deckView, setDeckView] = useState(JSON.parse(localStorage.getItem('deckView')) || []);
    

    useEffect(() => {
        localStorage.setItem('deckView', JSON.stringify(deckView, null, 2));
    }, [deckView]);


    function submitHandler(e){
        e.preventDefault()
        setIsLoading(true);
        findCard(searchText).then(res => {
            setMtgCards(res.cards)
        }).catch(err => {
            console.error(err)
        }).finally(() => {
            setIsLoading(false);
        })
        //setMtgCards(findCard(searchText))
    }

    function addCardToDeck(card){
        return setDeckView([...deckView, card])
    }

    const removeCard = (clickedCardIndex) => () => {
        const filterDeckView = deckView.filter((_, currentIndexInLoop) => {
            return currentIndexInLoop !== clickedCardIndex
        })
        setDeckView(filterDeckView)
       }
    
    return ( 
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                <button type="submit">Submit</button>
            </form>
            <div>
                {isLoading && 'Fetching Results'}
                {mtgCards.map((card, index) => <Card key={card.id} card={card} addCard={addCardToDeck}/>)}
            </div>
            <hr/>
            <div>
            {deckView.map((card, index) => <Card key={card.id + `:${index}`} card={card} removeCard={removeCard(index)} addCard={addCardToDeck}/>)}
            </div>
        </div>
     );
}
 

export default CardSubmit;