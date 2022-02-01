import React from 'react'
import CurrentBiggestContainer from './CurrentBiggest'
import MyCards from './MyCards'
import OppositeCards from './OppositeCards'
import LeftCards from './LeftCards'
import generateNewCards from '../logics/generateNewCards'
import comparingCardRanks from '../logics/comparingCardRanks'
import RightCards from './RightCards'


function App() {
  const me = 0
  const [allCards, setAllCards] = React.useState(generateNewCards(me))
  const [currentBiggest, setCurrentBiggest] = React.useState([])
  const [currentBiggestRank, setCurrentBiggestRank] = React.useState([]) //for 5 cards comparison only
  const [players, setPlayers] = React.useState(createPlayers())


  //create players objects FOR DEV
  function createPlayers() {
    let newPlayers = []
    for (let i = 0; i < 4; i++) {
      newPlayers.push({
        playerId: i,
        numberOfHands: 13
      })
    }
    return newPlayers
  }


  console.log(players)
 
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

    //comparing mySelectedCards with currentBiggest, returning boolean (if 5-card case returning an object with indicator)
    const comparison = comparingCardRanks(mySelectedCards, currentBiggest, currentBiggestRank)
    
    //if my cards are bigger, do the following
    if (comparison) {

      //if 5 cards, update the currentBiggestRank state
      if (comparison.rank) {
        setCurrentBiggestRank(comparison.rank)
      }      

      //play the cards and render them in CurrentBiggest
      setCurrentBiggest(mySelectedCards)

      //delete the played cards in allCards state
      setAllCards(prevAllCards => prevAllCards.filter(card => 
        !mySelectedCardsAllIndexes.includes(card.allCardsIndex)
      )) 

      //update the numberOfHands state to refresh the UI

    }       
  }

  return (
    <main>
      <CurrentBiggestContainer cards={currentBiggest}/>
      <MyCards cards={myCards} selectCard={selectCard}/>
      <OppositeCards handsNum={players[2].numberOfHands} />
      <LeftCards handsNum={players[3].numberOfHands} />
      <RightCards handsNum={players[1].numberOfHands} />
      <div className="button play" onClick={play}>Play</div>
    </main>
  );
}

export default App;
