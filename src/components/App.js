import React from 'react'
import { io } from 'socket.io-client'

import Login from './Login'
import CurrentBiggestContainer from './CurrentBiggest'
import MyCards from './MyCards'
import OppositeCards from './OppositeCards'
import LeftCards from './LeftCards'
import generateNewCards from '../logics/generateNewCards'
import comparingCardRanks from '../logics/comparingCardRanks'
import RightCards from './RightCards'
import Waiting from './Waiting'

//construct a new socket
const socket = io("http://localhost:8080");


function App() {
  const [me, setMe] = React.useState(0) //FOR DEV
  const [opponents, setOpponents] = React.useState([])



  const [allCards, setAllCards] = React.useState(generateNewCards(me))
  const [currentBiggest, setCurrentBiggest] = React.useState([])
  const [currentBiggestRank, setCurrentBiggestRank] = React.useState([]) //for 5 cards comparison only
  const [players, setPlayers] = React.useState([])

  const [isWaiting, setIsWaiting] = React.useState(false)
  const [isStart, setIsStart] = React.useState(false)
  const [myCards, setMyCards] = React.useState(null)


  //FOR DEV testing with socket
  

  React.useEffect(() => {    
    //connect to server
    socket.on("connect", () => {
      console.log(`You are connected! id:${socket.id}`)
    })
    //listen for anyone successfully joining a room
    socket.on("waiting", () => {setIsWaiting(true)})
    //listen for room filled
    socket.on("roomFilled", roomInfo => {
      setIsWaiting(false)
      setPlayers(roomInfo)
    })
    //assign playerIds when room is filled
    socket.on("assignPlayerId", pid => {
      console.log('my pid: ', pid) //FOR DEV
      setMe(pid)
      setOpponents(() => {
        switch (pid) {
          case 0:
            return [1, 2, 3]
            break
          case 1:
            return [2, 3, 0]
            break
          case 2:
            return [3, 0, 1]
            break
          case 3:
            return [0, 1, 2]
            break
        }
      })    
    })
    //server dealing cards to players
    socket.on("dealingCards", deck => {
      console.log(deck)
      setMyCards(deck)

      setIsStart(true) //start the game after all variables are confirmed
    })
    
    
    return () => {
      socket.removeAllListeners()
    }
  }, [])


    //////////////////////////////////////////////////
    //FOR DEV
   //put my cards in to a new array called 'myCards'
  //  let myCards = []
  //  let myCardsIndex = 0;
  //  for (let i = 0; i < allCards.length; i++) {
  //    if(allCards[i].me === true) {
  //      myCards.push(allCards[i]);
  //      myCards[myCardsIndex]['myCardsIndex'] = myCardsIndex;
  //      myCardsIndex++;
  //    }
  //  }
    //////////////////////////////////////////////////
  
  //FOR DEV
  console.log(players)
  console.log(me)
  console.log(opponents)
  // console.log(players)

  //FOR DEV create players objects 
  // function createPlayers() {
  //   let newPlayers = []
  //   for (let i = 0; i < 4; i++) {
  //     newPlayers.push({
  //       playerId: i,
  //       numberOfHands: 13
  //     })
  //   }
  //   return newPlayers
  // }
  
 
 


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
      {(!isWaiting && !isStart) ? <Login socket={socket} /> : ""}
      {isWaiting ? <Waiting /> : ""} 
      {isStart ? 
      <div>
        <CurrentBiggestContainer cards={currentBiggest}/>
        <MyCards cards={myCards} selectCard={selectCard}/>
        <OppositeCards handsNum={players[opponents[1]].numberOfHands} />
        <LeftCards handsNum={players[opponents[2]].numberOfHands} />
        <RightCards handsNum={players[opponents[0]].numberOfHands} />
        {/* <OppositeCards handsNum={13} />
        <LeftCards handsNum={13} />
        <RightCards handsNum={13} /> */}
        <div className="button play" onClick={play}>Play</div>
      </div> 
      : ""}
    </main>
  );
}

export default App;
