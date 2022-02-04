import React from 'react'
import { io } from 'socket.io-client'

import Login from './Login'
import CurrentBiggestContainer from './CurrentBiggest'
import MyCards from './MyCards'
import OppositeCards from './OppositeCards'
import LeftCards from './LeftCards'
import comparingCardRanks from '../logics/comparingCardRanks'
import RightCards from './RightCards'
import Waiting from './Waiting'

//construct a new socket which doesn't change when rerender
const socket = io("http://localhost:8080");


function App() {  
  const [players, setPlayers] = React.useState([])  
  const [opponents, setOpponents] = React.useState([])
  const [myCards, setMyCards] = React.useState(null)
  const [currentBiggest, setCurrentBiggest] = React.useState([])
  const [currentBiggestRank, setCurrentBiggestRank] = React.useState([]) //for 5 cards comparison only

  const [isRoomFull, setIsRoomFull] = React.useState(false)
  const [isWaiting, setIsWaiting] = React.useState(false)
  const [isStart, setIsStart] = React.useState(false)
  const [isMyRound, setIsMyRound] = React.useState(false)
  const [isFirstRound, setIsFirstRound] = React.useState(false)
  const [isPassedByAllOthers, setIsPassedByAllOthers] = React.useState(false)
  const [isWinner, setIsWinner] = React.useState(false)
  const [isWaitForWinner, setIsWaitForWinner] = React.useState(false)



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
      //leave the waiting stage
      setIsWaiting(false)
      //get room info from server
      setPlayers(roomInfo)
    })
    //assign playerIds when room is filled
    socket.on("assignPlayerId", pid => {
      setOpponents(() => {
        let opponentsArray;
        switch (pid) {
          case 0:
            opponentsArray = [1, 2, 3]
            break
          case 1:
            opponentsArray = [2, 3, 0]
            break
          case 2:
            opponentsArray = [3, 0, 1]
            break
          case 3:
            opponentsArray = [0, 1, 2]
            break
          default:
            break
        }
        return opponentsArray
      })    
    })
    //server dealing cards to players individually
    socket.on("dealingCards", deck => {
      setMyCards(deck)
      setIsStart(true) //start the game after all variables are confirmed
    })

    // //decide the round order
    // socket.on("decideRoundOrder", order => {
    //   console.log("round order is: ", order) //FOR DEV
    // })

    //listen if it is first round
    socket.on("firstRound", () => {
      setIsFirstRound(true)
    })

    //listen if it is my round
    socket.on("currentRound", isPassedByAllOthers => {
      setIsMyRound(true)          
      setIsPassedByAllOthers(isPassedByAllOthers)
    })    

    //server provides the latest currentBiggest and currentBiggestRank after a player plays
    socket.on("updateRound", latestInfo => {
      setCurrentBiggest(latestInfo.currentBiggest)
      setCurrentBiggestRank(latestInfo.currentBiggestRank)
      setPlayers(latestInfo.players)
    })

    //listen if I am winner
    socket.on("win", () => {
      setIsWinner(true)
    })

    //listen if the game is finished
    socket.on("waitForWinner", () => {
      setIsWaitForWinner(true)
    })
    
    
    return () => {
      socket.removeAllListeners()
    }
  }, [])



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
    const comparison = comparingCardRanks(mySelectedCards, currentBiggest, currentBiggestRank, isFirstRound)
    
    //FOR DEV
    console.log(comparison)

    //if my cards are bigger, do the following
    if (comparison) {      
      //set first round to false after the first play
      if(isFirstRound) setIsFirstRound(isFirstRound => !isFirstRound)   
     

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

      //check if I have 0 hand
      if(myCards.length === mySelectedCards.length) {
        setMyCards([])
        return socket.emit('emptyHand', {socketId: socket.id, room: players[0].room})
      }

      //delete the played cards in myCards state
      setMyCards(prevMyCards => {
        const newMyCardsArray = []
        let newMyCardsIndex = 0
        for (let i = 0; i < prevMyCards.length; i++) {
          if(!prevMyCards[i].selected) {
            const cardWithNewMyCardIndex = {
              ...prevMyCards[i],
              myCardsIndex: newMyCardsIndex
            }
            newMyCardsArray.push(cardWithNewMyCardIndex)
            newMyCardsIndex++
          }
        }
        return newMyCardsArray
      })

      //check if I am the winner
      // if(myCards.length === 0) {
      //   socket.emit('win')
      // }
    }      
  }

  function pass() {
    //tells the server I passed
    socket.emit('pass', myCards)
    //end my turn
    setIsMyRound(false) 
  }
  
  function startNewGame() {
    console.log("new game!")
  }


  //FOR DEV
  // console.log('currentBiggest', currentBiggest)
  // console.log('currentBiggestRank', currentBiggestRank)
  // console.log('myCards', myCards)
  // console.log('players[0].room', players[0].room)
  // console.log(socket.id)

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
        {!isWaitForWinner && isMyRound && <div className="button play" onClick={play}>Play</div>}
        {!isWaitForWinner && !isFirstRound && !isPassedByAllOthers && isMyRound && <div className="button pass" onClick={pass}>Pass</div>}
        {isWinner && <div className= "button newGame" onClick={startNewGame}>New Game</div>}
      </div>
      }
    </main>
  );
}

export default App;
