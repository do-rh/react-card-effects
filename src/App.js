import './App.css';
import Card from './Card';
import axios from 'axios';
import { React, useState, useEffect } from 'react';

const SHUFFLE_URL = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const DRAW_BASE_URL = 'http://deckofcardsapi.com/api/deck'; //<<deck_id>>/draw/?count=1';

/** Renders card drawing app using Deck of Cards API
 * 
 * Props: none
 * State: deckId, newCard, remaining
 * 
 * Index -> App -> Card
*/
function App() {

  const [deckId, setDeckId] = useState('');
  const [cards, setCards] = useState([]); //set to null vs empty obj.
  const [remaining, setRemaining] = useState(52);

  //will run on first render only.
  useEffect(function fetchDeckIdOnMount() {
    async function fetchDeckId() {
      const deckResult = await axios.get(SHUFFLE_URL);
      setDeckId(deckResult.data.deck_id); //string
    }
    fetchDeckId();
  }, []);

  //fetches card data from API upon click
  async function drawNewCardClick() {
    const cardResult = await axios.get(
      `${DRAW_BASE_URL}/${deckId}/draw/?count=1`);
      console.log(cards, cardResult.data.cards[0]);
    setCards(() => [...cards, cardResult.data.cards[0]]);
    setRemaining(cardResult.data.remaining);
  }

  return (
    <div>
      {(remaining > 0) && <button onClick={drawNewCardClick}>Draw a new card!</button>}
      <div>
        {(cards)
          ? cards.map((card, idx) => {
            return <Card key={idx} imageURL={card.image} value={card.value} suit={card.suit} /> })
          : null}
      </div>
    </div>
  );
}
//ternary comments: react renders false as nothing. Instead of ternary, use && pattern.
//If 1st is false, return 1st value (=false)


//list of cards instead of just one.
//

//state for deckID, newCard, remaining
//shuffleDeck useEffect to get deckID ([ ])
//fn to make axios call to get new deck
//set deckID
//newCard handleClick fn
//fn to make axios call to get card
//set newCard + remaining
//btn - dependent on remaining state. remaining = 0, remove btn.

export default App;

