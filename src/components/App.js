import React from 'react'
import CurrentBiggestContainer from './CurrentBiggest'
import MyCards from './MyCards'

function App() {
  const me = 0
  const [allCards, setAllCards] = React.useState(generateNewCards())
  const [currentBiggest, setCurrentBiggest] = React.useState([])

  

  function generateNewCards() {
    //create a empty array
    let deck = []
    for (let i = 0; i < 52; i++) {
      let suit;
      let number;
      //decide suit and number
      if (i < 13) {
        suit = 0;
        number = i + 3;
      } else if (i < 26) {
        suit = 1;
        number = i + 3 - 13;
      } else if (i < 39) {
        suit = 2;
        number = i + 3 - 13 * 2;
      } else {
        suit = 3;
        number = i + 3 - 13 * 3;
      }
      //push a card object to deck
      deck.push({
        suit,
        number,
        selected: false
      })
    }
    
    //shuffle cards
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    //distribute cards
    for (let i = 0; i < deck.length; i++) {
      deck[i]['allCardsIndex'] = i;
      if (i < 13) {
        deck[i]['owner'] = 0
      } else if (i < 26) {
        deck[i]['owner'] = 1
      } else if (i < 39) {
        deck[i]['owner'] = 2
      } else {
        deck[i]['owner'] = 3
      }
    }

    //setting 'me' property to true for my hand cards
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].owner === me) {
        deck[i]['me'] = true;
      } else {
        deck[i]['me'] = false;
      }
    }
    return deck
  }
 
  //put my cards in to a new array
  let myCards = []
  let myCardsIndex = 0;
  for (let i = 0; i < allCards.length; i++) {
    if(allCards[i].me === true) {
      myCards.push(allCards[i]);
      myCards[myCardsIndex]['myCardsIndex'] = myCardsIndex;
      myCardsIndex++;
    }
  }


  function selectCard(index) {    
    setAllCards(prevAllCards => prevAllCards.map(card => {
      if (card.allCardsIndex === index) {
        return {...card, selected: !card.selected}
      }
      return card
    }))
  }

  function play() {
    //push my selected cards into a new array
    const mySelectedCards = []
    const mySelectedCardsAllIndexes = []
    for (let i = 0; i < allCards.length; i++) {
      if(allCards[i].me && allCards[i].selected) {
        mySelectedCards.push(allCards[i])
        mySelectedCardsAllIndexes.push(allCards[i].allCardsIndex)
      }
    }
    //play the cards and render them in CurrentBiggest
    setCurrentBiggest(mySelectedCards)

    //delete the played cards in allCards state
    setAllCards(prevAllCards => prevAllCards.filter(card => 
      !mySelectedCardsAllIndexes.includes(card.allCardsIndex)
    ))    
  }

  //for dev
  console.log(allCards)

  return (
    <main>
      <CurrentBiggestContainer cards={currentBiggest}/>
      <MyCards cards={myCards} selectCard={selectCard}/>
      <div className="button play" onClick={play}>Play</div>
    </main>
  );
}

export default App;
