import React, {useState, useEffect} from 'react';
import findCard from '../findCard';
import Card from './Card';
import '../index.css';

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

        const intendedShape =   [
                                //card Stack
                                    {
                                        "quantity": 4,
                                        "id": '2da52425-67da-59a1-8f06-474e791bae63',
                                        "card": 
                                        {
                                            id: "2da52425-67da-59a1-8f06-474e791bae63",
                                            imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129665&type=card",
                                            name: "Ornithopter"
                                        }
                                    }
                                ]


        console.log(formattedDeckView);
        return formattedDeckView
    }

    const removeCard = (clickedCardIndex) => () => {
        const filterDeckView = deckView.filter((_, currentIndexInLoop) => {
            return currentIndexInLoop !== clickedCardIndex
        })
        setDeckView(filterDeckView)
       }

       //console.log(newDeckView);
    
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