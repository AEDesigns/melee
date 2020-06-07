import React, {useState, useEffect} from 'react';
import findCard from '../findCard';
import Card from './Card';
import '../index.css';
import CardStack from './CardStack';
import SearchedCards from './searchCards';

const CardSubmit = () => {
    
    const [searchText, setSearchText] = useState('');
    const [mtgCards, setMtgCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deckView, setDeckView] = useState(JSON.parse(localStorage.getItem('deckView')) || []);
    const [newDeckView, setNewDeckView] = useState([])

    useEffect(() => {
        localStorage.setItem('deckView', JSON.stringify(deckView, null, 2));
        setNewDeckView(formatDeckView(deckView))
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
        console.log(card)
        return setDeckView([...deckView, card])
    }

    function formatDeckView(deckView){
        const formattedDeckView = [];
        
        for(let i = 0; i < deckView.length; i++){
            const iId = deckView[i].id;
            if(formattedDeckView.some(({id}) => id === iId)){
                continue;
            }
            let counter = 0;
            for(var j = i++; j < deckView.length; j++){
                const jId = deckView[j].id
                if(jId === iId){
                    counter++
                }
            }
            const shapeToPush = {
                quantity: counter,
                id: iId,
                card: deckView[i]
            }


            formattedDeckView.push(shapeToPush)
        }

        return formattedDeckView
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
                {mtgCards.map((card, index) => <SearchedCards key={card.id} card={card} addCard={addCardToDeck}/>)}
            </div>
            <hr/>
            <div>
                {newDeckView.map((cardStack, index) => <CardStack removeCard={removeCard} key={index} cardStack={cardStack} addCard={addCardToDeck}/>)}
            </div>
            <div>
            </div>
        </div>
     );
}
 

export default CardSubmit;