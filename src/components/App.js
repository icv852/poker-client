import React from 'react'
import CurrentBiggestContainer from './CurrentBiggest'
import MyCards from './MyCards'
import generateNewCards from '../logics/generateNewCards'
import comparingCardRanks from '../logics/comparingCardRanks'


function App() {
  const me = 0
  const [allCards, setAllCards] = React.useState(generateNewCards(me))
  const [currentBiggest, setCurrentBiggest] = React.useState([])
  
 
  //put my cards in to a new array called 'myCards'
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

    //comparing mySelectedCards with currentBiggest, returning boolean
    const bigger = comparingCardRanks(mySelectedCards, currentBiggest)

    //if my cards are bigger, do the following
    if (bigger) {
      //play the cards and render them in CurrentBiggest
      setCurrentBiggest(mySelectedCards)

      //delete the played cards in allCards state
      setAllCards(prevAllCards => prevAllCards.filter(card => 
        !mySelectedCardsAllIndexes.includes(card.allCardsIndex)
      )) 
    }       
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
