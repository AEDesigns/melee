import React, {useState, useEffect} from 'react';
import findCard from '../findCard';
import '../index.css';
import CardStack from './CardStack';
import SearchedCards from './searchCards';
import {
    FacebookShareButton,
    TwitterShareButton
  } from "react-share";
  import {
    FacebookIcon,
    TwitterIcon
  } from "react-share";

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
    }

    function addCardToDeck(card){
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
        console.log(deckView)
       }
    
    return ( 
        <div>
            {deckView.length >= 1 ? 
            <FacebookShareButton url={`${window.location.href}`}>
                <FacebookIcon size={32} round={true}/>
            </FacebookShareButton> : ''}
            {deckView.length >= 1 ? 
            <TwitterShareButton url={`${window.location.href}`}>
                <TwitterIcon size={32} round={true}/>
            </TwitterShareButton> : ''}
            {isLoading && 'Fetching Results'}
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                <button type="submit">Submit</button>
            </form>
            <div>
                {mtgCards.map((card, index) => <SearchedCards key={card.id} card={card} addCard={addCardToDeck}/>)}
            </div>
            <hr/>
            <div>
                {newDeckView.map((cardStack, index) => <CardStack removeCard={removeCard} key={index} cardStack={cardStack} addCard={addCardToDeck}/>)}
            </div>
            <div style={{bottom: "0", position: "absolute"}}>
                {deckView.length >= 1 ? <button onClick={() => setDeckView([])}>Clear Deck</button>  : ""}
            </div>
            <div>
            </div>
        </div>
     );
}
 

export default CardSubmit;