// Cards array
const enterpriseCards = [
    {
        ticker: "VALE3",
        priceOverProfits: 4.03,
        dividendYield: 19.48,
        roe: 52.78,
        image: "./images/vale-logo.png",
    },
    {
        ticker: "WEGE3",
        priceOverProfits: 44.35,
        dividendYield: 1.12,
        roe: 27.09,
        image: "./images/weg-logo.png",
    },
    {
        ticker: "TAEE11",
        priceOverProfits: 4.67,
        dividendYield: 13.13,
        roe: 37.82,
        image: './images/taesa-logo.png',
    },
    {
        ticker: "GGBR3",
        priceOverProfits: 3.08,
        dividendYield: 13.91,
        roe: 31.63,
        image: './images/gerdau-logo.png',
    },
    {
        ticker: "MGLU3",
        priceOverProfits: 58.44,
        dividendYield: 0.67,
        roe: 6.6,
        image: './images/magalu-logo.png',
    }
]

// Variables
let playerScore = 0;
let oponentScore = 0;
let rounds = 0;
const playerSortedCards = [];
const oponentSortedCards = [];
const playerSortedCardsObject = [];
const maxCards = enterpriseCards.length;
const enterpriseCardsCopy = JSON.parse(JSON.stringify(enterpriseCards));

// Functions
const sortCard = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}

const showPlayerCard = (enterpriseStock) => {
    document.getElementById("logo-stock-player").src=enterpriseStock.image;
    document.getElementById("player-price-over-profits-label").innerHTML = `P/L: ${enterpriseStock.priceOverProfits}`;
    document.getElementById("player-dividend-yield-label").innerHTML = `DY: ${enterpriseStock.dividendYield}%`;
    document.getElementById("player-roe-label").innerHTML = `ROE: ${enterpriseStock.roe}%`;
}

const showOponentCard = (enterpriseStock) => {
    document.getElementById("logo-stock-oponent").src=enterpriseStock.image;
    document.getElementById("oponent-price-over-profits-label").innerHTML = `P/L: ${enterpriseStock.priceOverProfits}`;
    document.getElementById("oponent-dividend-yield-label").innerHTML = `DY: ${enterpriseStock.dividendYield}%`;
    document.getElementById("oponent-roe-label").innerHTML = `ROE: ${enterpriseStock.roe}%`;
}


const clickOponentSortCardBtn = () => {
    document.getElementById("oponent-sort-btn").click();
}

const checkRoundWinner = (playerEnterpriseStock, oponentEnterpriseStock) => {   
    let playerValue = 0;
    let oponentValue = 0;
    const summaryElement = document.createElement("h5");
    summaryElement.setAttribute("id", "summary");
    document.getElementById("round-counter").appendChild(summaryElement);
    if(document.getElementById("price-over-profits").checked) { 
        playerValue = playerEnterpriseStock.priceOverProfits;
        oponentValue = oponentEnterpriseStock.priceOverProfits;
    } else if(document.getElementById("dividend-yield").checked) { 
        playerValue = playerEnterpriseStock.dividendYield;
        oponentValue = oponentEnterpriseStock.dividendYield;
    } else if(document.getElementById("roe").checked) { 
        playerValue = playerEnterpriseStock.roe;
        oponentValue = oponentEnterpriseStock.roe;
    }
    if(playerValue > oponentValue){
        document.getElementById("player-score").innerHTML = `Pontuação: ${playerScore +=1}`;
        summaryElement.innerText = `Jogador venceu rodada ${rounds + 1}`
    } else if (playerValue < oponentValue){
        document.getElementById("oponent-score").innerHTML = `Pontuação: ${oponentScore +=1}`;
        summaryElement.innerText = `Jogador perdeu rodada ${rounds + 1}`
    }
}

const hasPlayedAllRounds = (numberOfCards, numberOfRounds) => {
    let hasCompleteGame = numberOfCards === numberOfRounds ? true : false;
    return hasCompleteGame;
}

const checkMasterOfStocks  = () => {
    if(hasPlayedAllRounds(maxCards, rounds)){
        const sectionElement = document.createElement("section");
        sectionElement.setAttribute("id", "result")
        const battleFieldElement = document.getElementById("campo-de-batalha");
        const fatherDiv = battleFieldElement.parentNode;
        fatherDiv.insertBefore(sectionElement, battleFieldElement);
        if(playerScore > oponentScore){
            const winImg = document.createElement("img");
            const winText = document.createElement("p");
            winText.innerText = `Placar final: ${playerScore} x ${oponentScore}. Parabéns, você é o Mestre das Ações!` 
            winImg.src = `images/b3-bull.jpg`;
            document.getElementById("result").appendChild(winText);
            document.getElementById("result").appendChild(winImg);
        } else if (playerScore < oponentScore){
            const lossImg = document.createElement("img");
            const lossText = document.createElement("p");
            lossText.innerText = `Placar final: ${playerScore} x ${oponentScore}. É tempo de vacas magras!` 
            lossImg.src = `images/fit-cow-b3.jpeg`;
            document.getElementById("result").appendChild(lossText);
            document.getElementById("result").appendChild(lossImg);
        }
    window.scrollTo({ top: 0, behavior: 'smooth' })    
    }
}


// Buttons on click
document.getElementById("player-sort-btn").addEventListener("click", () => {
    const stock = sortCard(enterpriseCards)
    if(playerSortedCards.indexOf(stock.ticker) === -1) {
        playerSortedCardsObject.push(stock);
        playerSortedCards.push(stock.ticker);
        showPlayerCard(stock);
        enterpriseCards.splice(enterpriseCards.indexOf(stock), 1);
    }
});

document.getElementById("oponent-sort-btn").addEventListener("click", () => {
    let stock = sortCard(enterpriseCardsCopy);
    oponentSortedCards.push(stock.ticker);
    if(playerSortedCards[playerSortedCards.length - 1] !== oponentSortedCards[oponentSortedCards.length - 1] ) {
        showOponentCard(stock);
        enterpriseCardsCopy.splice(enterpriseCardsCopy.indexOf(stock), 1);
        checkRoundWinner(playerSortedCardsObject[playerSortedCards.length - 1], stock);
        rounds += 1;
        checkMasterOfStocks();
    } else if (playerSortedCards[playerSortedCards.length - 1] === oponentSortedCards[oponentSortedCards.length - 1] && playerSortedCards.length === maxCards){
        console.log("Empate na última rodada, sem pontos adicionados");
        rounds += 1;
        checkMasterOfStocks();
    } else {
        while(playerSortedCards[playerSortedCards.length - 1] === oponentSortedCards[oponentSortedCards.length - 1]){
            oponentSortedCards.splice(oponentSortedCards.indexOf(stock), 1);
            clickOponentSortCardBtn();
        }
    }
    if(rounds +1 <= 5){
        document.getElementById("round-value").innerText = `Rodada: ${rounds + 1}`;
    } else {
        document.getElementById("round-value").innerText = `Fim de jogo`;
    }  
});