export default function comparingCardRanks(mine, biggest, biggestRank, isFirstRound) {

    //check if the number of my cards is valid (1,2,3 or 5)
    const validNumbersOfCards = [1, 2, 3, 5];
    if (!validNumbersOfCards.includes(mine.length)) return false

    //check if the number of cards of mine and biggest are the same
    if (biggest.length !== 0 && mine.length !== biggest.length) return false  

    //check if my cards contain 'Diamond 3' if it is first round
    if (isFirstRound) {
        let containsDiamond3 = false
        for (let i = 0; i < mine.length; i++) {
            if(mine[i].suit === 0 && mine[i].number === 3) {
                containsDiamond3 = true
            }
        }
        if (!containsDiamond3) return false
    }

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
        // mine.sort((a, b) => a.suit - b.suit)
        console.log(mine.sort((a, b) => a.suit - b.suit))    //FOR DEV
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
        console.log(mine.sort((a, b) => a.suit - b.suit)) //FOR DEV
        // mine.sort((a, b) => a.suit - b.suit) 
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
        //flush ranks for 5 cards:
            // straight: 1
            // flush: 2
            // full house: 3
            // four of a kind: 4
            // straight flush: 5       

        //initiate a rank object (only used for 5)
        let rank = {
            rankIndex: -1,
            indicator: null
        }

        //sort the cards based on number (from small to big)
        console.log(mine.sort((a, b) => a.number - b.number)) //FOR DEV
        mine.sort((a, b) => a.number - b.number)

        //create two arrays to store my cards numbers and suits
        const myCardNumbers = []
        const myCardSuits = []
        //fill the above 2 new arrays
        for (let i = 0; i < mine.length; i++) {
            myCardNumbers.push(mine[i].number)
            myCardSuits.push(mine[i].suit)
        }

        //loop over myCardNumbers array and check if there are same numbers
        let lastNum = -1
        let sameNumsCount = 0
        let sameNumsFound = []

        for (let i = 0; i < myCardNumbers.length + 1; i++) { //in last iteration myCardNumbers[i] = undefined
            if(myCardNumbers[i] === lastNum) {
                sameNumsCount++
            } 
            else if(sameNumsCount !== 0) {
                sameNumsFound.push({num: lastNum, count: sameNumsCount + 1})
                sameNumsCount = 0
            }
            
            lastNum = myCardNumbers[i]
        }

        //inspect the sameNumsFound array
        //check if 'Four of a Kind'
        if(sameNumsFound.length === 1 && sameNumsFound[0].count === 4) {            
            rank.rankIndex = 4
            rank.indicator = sameNumsFound[0].num
        }
        //check if 'full house'
        if(sameNumsFound.length === 2) 
        {
            if((sameNumsFound[0].count === 2 && sameNumsFound[1].count === 3) || 
                (sameNumsFound[0].count === 3 && sameNumsFound[1].count === 2))
            {
                rank.rankIndex = 3
                for (let i = 0; i < sameNumsFound.length; i++) {
                    if(sameNumsFound[i].count === 3) {
                        rank.indicator = sameNumsFound[i].num
                    }
                }
            }
        }

        //check if all suits are same and return a boolean
        let sameSuits = myCardSuits.every(suit => suit === myCardSuits[0])        

        //check if it is straight
        let isStraight = false
        let isA2Straight = false
        let is2Straight = false
        //first check if the last element is 'Big 2' and check for the two special cases
        if(myCardNumbers[4] === 15) {
            let combination1 = [3, 4, 5, 14, 15]
            let combination2 = [3, 4, 5, 6, 15]
            if (myCardNumbers.every((v, i) => v === combination1[i])) {
                isStraight = true
                isA2Straight = true
            }
            else if (myCardNumbers.every((v, i) => v === combination2[i])){
                isStraight = true
                is2Straight = true
            }
        }
        //loop over myCardNums array and check if the numbers are consecutive
        let lastNumber = myCardNumbers[0]
        let straightCounter = 0
        for(let i = 1; i < myCardNumbers.length; i++) { //start the loop from the second element
            if(myCardNumbers[i] === lastNumber + 1) {
                straightCounter++
            }
            lastNumber = myCardNumbers[i]
        }
        if (straightCounter === 4) isStraight = true

        //using sameSuits and isStraight testing results from above, flush, straight and straight flush can be determined
        //check for flush
        if (sameSuits && !isStraight) {
            rank.rankIndex = 2
            rank.indicator = {
                num: myCardNumbers[4],
                suit: myCardSuits[4]
            }
        }
        //check for straight and straight flush
            //straight internal ranks:
                //A2 straight: 3
                //2 straight: 2
                //other straights: 1
        if (isStraight) {
            rank.indicator = {
                num: myCardNumbers[4],
                suit: myCardSuits[4]
            }
            //check if A2 or 2 straights
            if(isA2Straight) rank.indicator.straightRank = 3
            else if(is2Straight) rank.indicator.straightRank = 2
            else rank.indicator.straightRank = 1
            //check if straight flush
            if(sameSuits) rank.rankIndex = 5
            else rank.rankIndex = 1
        }
        //all tests done and return false if not valid combination
        if(rank.rankIndex < 0) return false
        //if biggest not exists return true
        if(biggest.length === 0) return ({bigger: true, rank})
        //compare my card rank with the currentBiggestRank 
        if(rank.rankIndex < biggestRank.rankIndex) return false
        else if(rank.rankIndex > biggestRank.rankIndex) return ({bigger: true, rank})
        //if same rankIndex, do further comparison
            //comparison for 'full house' or 'four of a kind'
        else if(rank.rankIndex === 3 || rank.rankIndex === 4) {
            if(rank.indicator < biggestRank.indicator) return false
            else return ({bigger: true, rank})
        }
            //comparison for 'flush'
        else if(rank.rankIndex === 2) {
            if(rank.indicator.num < biggestRank.indicator.num) return false
            else if(rank.indicator.num === biggestRank.indicator.num && rank.indicator.suit < biggestRank.indicator.suit) return false
            else return ({bigger: true, rank})
        }
            //comparison for 'straight' or 'straight flush'
        else if(rank.rankIndex === 1 || rank.rankIndex === 5) {
            if(rank.indicator.straightRank < biggestRank.indicator.straightRank) return false
            else if(rank.indicator.straightRank > biggestRank.indicator.straightRank) return ({bigger: true, rank})
                //compare nums and suits when they have same straightRank
            else if(rank.indicator.num < biggestRank.indicator.num) return false
            else if(rank.indicator.num === biggestRank.indicator.num && rank.indicator.suit < biggestRank.indicator.suit) return false
            else return ({bigger: true, rank})
        }
    }        
}