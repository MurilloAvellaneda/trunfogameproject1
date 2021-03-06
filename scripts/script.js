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
let opponentScore = 0;
let rounds = 0;
const playerSortedCards = [];
const opponentSortedCards = [];
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

const showOpponentCard = (enterpriseStock) => {
    document.getElementById("logo-stock-opponent").src=enterpriseStock.image;
    document.getElementById("opponent-price-over-profits-label").innerHTML = `P/L: ${enterpriseStock.priceOverProfits}`;
    document.getElementById("opponent-dividend-yield-label").innerHTML = `DY: ${enterpriseStock.dividendYield}%`;
    document.getElementById("opponent-roe-label").innerHTML = `ROE: ${enterpriseStock.roe}%`;
}


const clickOpponentSortCardBtn = () => {
    document.getElementById("opponent-sort-btn").click();
}

const checkRoundWinner = (playerEnterpriseStock, opponentEnterpriseStock) => {   
    let playerValue = 0;
    let opponentValue = 0;
    const summaryElement = document.createElement("h5");
    const summaryElementDiv = document.createElement("div");
    summaryElement.setAttribute("id", "summary");
    summaryElementDiv.setAttribute("id", "summary-div");
    document.getElementById("round-counter").appendChild(summaryElementDiv);
    document.getElementById("summary-div").appendChild(summaryElement);
    if(document.getElementById("price-over-profits").checked) { 
        playerValue = playerEnterpriseStock.priceOverProfits;
        opponentValue = opponentEnterpriseStock.priceOverProfits;
    } else if(document.getElementById("dividend-yield").checked) { 
        playerValue = playerEnterpriseStock.dividendYield;
        opponentValue = opponentEnterpriseStock.dividendYield;
    } else if(document.getElementById("roe").checked) { 
        playerValue = playerEnterpriseStock.roe;
        opponentValue = opponentEnterpriseStock.roe;
    }
    if(playerValue > opponentValue){
        document.getElementById("player-score").innerHTML = `Pontua????o: ${playerScore +=1}`;
        summaryElement.innerText = `Jogador venceu rodada ${rounds + 1}`
    } else if (playerValue < opponentValue){
        document.getElementById("opponent-score").innerHTML = `Pontua????o: ${opponentScore +=1}`;
        summaryElement.innerText = `Jogador perdeu rodada ${rounds + 1}`
    } else { 
        summaryElement.innerText = `Empate na rodada ${rounds + 1}`
    }
}

const hasPlayedAllRounds = (numberOfCards, numberOfRounds) => {
    return numberOfCards === numberOfRounds;
}

const checkMasterOfStocks  = () => {
    if(hasPlayedAllRounds(maxCards, rounds)){
        const sectionElement = document.createElement("section");
        sectionElement.setAttribute("id", "result")
        const battleFieldElement = document.getElementById("campo-de-batalha");
        const fatherDiv = battleFieldElement.parentNode;
        fatherDiv.insertBefore(sectionElement, battleFieldElement);
        if(playerScore > opponentScore){
            const winImg = document.createElement("img");
            const winText = document.createElement("p");
            winText.innerText = `Placar final: ${playerScore} x ${opponentScore}. Parab??ns, voc?? ?? o Mestre das A????es!` 
            winImg.src = `images/b3-bull.jpg`;
            document.getElementById("result").appendChild(winText);
            document.getElementById("result").appendChild(winImg);
        } else if (playerScore < opponentScore){
            const lossImg = document.createElement("img");
            const lossText = document.createElement("p");
            lossText.innerText = `Placar final: ${playerScore} x ${opponentScore}. ?? tempo de vacas magras!` 
            lossImg.src = `images/fit-cow-b3.jpeg`;
            document.getElementById("result").appendChild(lossText);
            document.getElementById("result").appendChild(lossImg);
        } else {
            const tieText = document.createElement("p");
            tieText.innerText = `Placar final: ${playerScore} x ${opponentScore}. Empate!`
            document.getElementById("result").appendChild(tieText);
        }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById("result").innerHTML += `<input type="button" id="new-game" value="Jogar Novamente" onClick="window.location.reload(true)"></input>`;
    }
}


// Buttons on click
document.getElementById("player-sort-btn").addEventListener("click", () => {
    const stock = sortCard(enterpriseCards)
    if(playerSortedCards.indexOf(stock.ticker) === -1 && playerSortedCards.length === opponentSortedCards.length) {
        playerSortedCardsObject.push(stock);
        playerSortedCards.push(stock.ticker);
        showPlayerCard(stock);
        enterpriseCards.splice(enterpriseCards.indexOf(stock), 1);
    } else {
        alert("Ap??s selecionar o indicador voc?? deve sortear a carta do advers??rio");
    }
});

document.getElementById("opponent-sort-btn").addEventListener("click", () => {
    if((document.getElementById("price-over-profits").checked || document.getElementById("dividend-yield").checked || document.getElementById("roe").checked) && playerSortedCards.length - 1 === opponentSortedCards.length) { 
        let stock = sortCard(enterpriseCardsCopy);
        opponentSortedCards.push(stock.ticker);
        if(playerSortedCards[playerSortedCards.length - 1] !== opponentSortedCards[opponentSortedCards.length - 1] ) {
            showOpponentCard(stock);
            enterpriseCardsCopy.splice(enterpriseCardsCopy.indexOf(stock), 1);
            checkRoundWinner(playerSortedCardsObject[playerSortedCards.length - 1], stock);
            rounds += 1;
            checkMasterOfStocks();
        } else if (playerSortedCards[playerSortedCards.length - 1] === opponentSortedCards[opponentSortedCards.length - 1] && playerSortedCards.length === maxCards){
            console.log("Empate na ??ltima rodada, sem pontos adicionados");
            checkRoundWinner(playerSortedCardsObject[playerSortedCards.length - 1], stock);
            rounds += 1;
            checkMasterOfStocks();
        } else {
            while(playerSortedCards[playerSortedCards.length - 1] === opponentSortedCards[opponentSortedCards.length - 1]){
                opponentSortedCards.splice(opponentSortedCards.indexOf(stock), 1);
                clickOpponentSortCardBtn();
            }
        }
        if(rounds +1 <= 5){
            document.getElementById("round-value").innerText = `Rodada: ${rounds + 1}`;
        } else {
            document.getElementById("round-value").innerText = `Fim de jogo`;
        }  
    } else {
        alert("Selecione um indicador antes de sortear o advers??rio ou sorteie uma nova empresa para o jogador!")
    }
});
