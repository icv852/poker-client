export default function comparingCardRanks(mine, biggest) {
    //check if the number of my cards is valid (1,2,3 or 5)
    const validNumbersOfCards = [1, 2, 3, 5];
    if (!validNumbersOfCards.includes(mine.length)) return false

    //check if the number of cards of mine and biggest are the same
    if (biggest.length !== 0 && mine.length !== biggest.length) return false  

    //when I play 1 card:
    if(mine.length === 1) {
        //if biggest not exists return true
        if (biggest.length === 0) return true
        //compare number
        if(biggest[0].number > mine[0].number) return false
        //compare suit when same number
        else if(biggest[0].number === mine[0].number && biggest[0].suit > mine[0].suit) return false
        else return true
    }

    //when I play 2 cards:
    if(mine.length === 2) {
        //sort my cards based on suits
        mine.sort((a, b) => a.suit - b.suit)   
        //if mine is not a pair return false
        if(mine[0].number !== mine[1].number) return false    
        //if biggest not exists return true
        if (biggest.length === 0) return true      
                
        //compare number
        if(biggest[0].number > mine[0].number) return false
        //compare suit when same number
        else if(biggest[0].number === mine[0].number) {
            if(biggest[1].suit > mine[1].suit) return false
        }
        else return true      
    }

    //When I play 3 cards:
    if(mine.length === 3) {
        //sort my cards based on suits
        mine.sort((a, b) => a.suit - b.suit) 
        //if mine is not triple return false
        if(!(mine[0].number === mine[1].number && mine[1].number === mine[2].number)) return false
        //if biggest not exists return true
        if (biggest.length === 0) return true 
        //compare number
        if(biggest[0].number > mine[0].number) return false
        else return true
    }

    //When I play 5 cards:
    if(mine.length === 5) {
        //sort the cards based on number (from small to big)
        mine.sort((a, b) => a.number - b.number)
        console.log(mine)

        //create two arrays to store my cards numbers and suits
        const myCardNumbers = []
        const myCardSuits = []
        //fill the above 2 new arrays
        for (let i = 0; i < mine.length; i++) {
            myCardNumbers.push(mine[i].number)
            myCardSuits.push(mine[i].suit)
        }

        




        //determine my card rank
            //check if there are cards with same number

    }

    return true
}