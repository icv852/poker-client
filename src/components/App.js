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

  const [isRoomFull, setIsRoomFull] = React.useState(false)
  const [isWaiting, setIsWaiting] = React.useState(false)
  const [isStart, setIsStart] = React.useState(false)
  const [myCards, setMyCards] = React.useState(null)
  const [isMyRound, setIsMyRound] = React.useState(false)



  //FOR DEV testing with socket
  

  React.useEffect(() => {    
    //connect to server
    socket.on("connect", () => {
      console.log(`You are connected! id:${socket.id}`)
    })
    //if the room is full
    socket.on("full", message => {
      setIsRoomFull(message)
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

    //decide the round order
    socket.on("decideRoundOrder", order => {
      console.log("round order is: ", order) //FOR DEV
    })

    //listen if it is my round
    socket.on("currentRound", () => {
      setIsMyRound(true)
    })

    //server provides the latest currentBiggest and currentBiggestRank
    socket.on("updateRound", latestInfo => {
      setCurrentBiggest(latestInfo.currentBiggest)
      setCurrentBiggestRank(latestInfo.currentBiggestRank)
      setPlayers(latestInfo.players)
    })
    
    
    return () => {
      socket.removeAllListeners()
    }
  }, [])


  // console.log(players)


  function selectCard(index) {
    setMyCards(prevMyCards => prevMyCards.map(card => {
      if (card.myCardsIndex === index) {
        return {...card, selected: !card.selected}
      }
      return card
    }))
  }

  function play() {
    //push my selected cards into a new array
    const mySelectedCards = []
    const mySelectedCardsAllIndexes = []
    for (let i = 0; i < myCards.length; i++) {
      if(myCards[i].selected) {
        mySelectedCards.push(myCards[i])
        mySelectedCardsAllIndexes.push(myCards[i].allCardsIndex)
      }
    }

    //comparing mySelectedCards with currentBiggest, returning boolean (if 5-card case returning an object with indicator)
    const comparison = comparingCardRanks(mySelectedCards, currentBiggest, currentBiggestRank)
    
    //if my cards are bigger, do the following
    if (comparison) {     
      //tells the server my played cards
          //if 5 cards send an object with rank
      if (comparison.rank) {
        socket.emit('play', {cards: mySelectedCards, rank: comparison.rank})
      } else {
          //fewer than 5 cards
        socket.emit('play', mySelectedCards)
      }

      //end my turn
      setIsMyRound(false)      

      //play the cards and render them in CurrentBiggest
      // setCurrentBiggest(mySelectedCards)
      

      //delete the played cards in allCards state
      // setAllCards(prevAllCards => prevAllCards.filter(card => 
      //   !mySelectedCardsAllIndexes.includes(card.allCardsIndex)
      // )) 

      //update the numberOfHands state to refresh the UI

    }       
  }

  function pass() {
    console.log("pass!")
  }
  

  //FOR DEV
  console.log('currentBiggest', currentBiggest)
  console.log('currentBiggestRank', currentBiggestRank)

  return (
    <main>
      {(!isWaiting && !isStart) && <Login socket={socket} />}
      {(!isWaiting && !isStart && isRoomFull) && <p>{isRoomFull}</p>}
      {isWaiting && <Waiting />} 
      {isStart && 
      <div>
        <CurrentBiggestContainer cards={currentBiggest}/>
        <MyCards cards={myCards} selectCard={selectCard}/>
        <OppositeCards handsNum={players[opponents[1]].numberOfHands} />
        <LeftCards handsNum={players[opponents[2]].numberOfHands} />
        <RightCards handsNum={players[opponents[0]].numberOfHands} />
        {isMyRound && <div className="button play" onClick={play}>Play</div>}
        {isMyRound && <div className="button pass" onClick={pass}>Pass</div>}
      </div>
      }
    </main>
  );
}

export default App;
