export default function sortMyHands(cards) {
    //FOR DEV
    console.log(cards)

    //create a temporary cards array
    let newMyCardsArray = []

    //sort my hands based on number
    // cards.sort((a, b) => a.number - b.number)

    //sort my hands based on number
    for (let i = 3; i < 16; i++) {
        let cardsOfSameNum = cards.filter(card => card.number === i)
        if (cardsOfSameNum.length === 1) {
            newMyCardsArray.push(cardsOfSameNum[0])
        }
        else if (cardsOfSameNum.length > 1) {
            //sort cards of same number based on suits
            cardsOfSameNum.sort((a, b) => a.suit - b.suit)
            for (let j = 0; j < cardsOfSameNum.length; j++) {
                newMyCardsArray.push(cardsOfSameNum[j])
            }
        }
    }

    //update myCardsIndex prop for each card
    for (let i = 0; i < newMyCardsArray.length; i++) {
        newMyCardsArray[i].myCardsIndex = i
    }

    return newMyCardsArray
}

