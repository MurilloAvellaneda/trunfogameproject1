// Cards array
const enterpriseCards = [
    {
        ticker: "VALE3",
        priceOverProfits: 4.03,
        dividendYield: 19.48,
        roe: 52.78,
        image: "../images/vale-logo.png",
    },
    {
        ticker: "WEGE3",
        priceOverProfits: 44.35,
        dividendYield: 1.12,
        roe: 27.09,
        image: "../images/weg-logo.png",
    },
    {
        ticker: "TAEE11",
        priceOverProfits: 4.67,
        dividendYield: 13.13,
        roe: 37.82,
        image: '../images/taesa-logo.png',
    },
    {
        ticker: "GGBR3",
        priceOverProfits: 3.08,
        dividendYield: 13.91,
        roe: 31.63,
        image: '../images/gerdau-logo.png',
    },
    {
        ticker: "MGLU3",
        priceOverProfits: 58.44,
        dividendYield: 0.67,
        roe: 6.6,
        image: '../images/magalu-logo.png',
    }
]

const sortCard = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}

const playerSortedCards = [];
const oponentSortedCards = [];

document.getElementById("player-sort-btn").addEventListener("click", () => {
    const stock = sortCard(enterpriseCards)
    if(playerSortedCards.indexOf(stock.ticker) === -1) {
        playerSortedCards.push(stock.ticker);
        document.getElementById("logo-stock-player").src=stock.image;
        document.getElementById("player-price-over-profits-label").innerHTML = `P/L: ${stock.priceOverProfits}`;
        document.getElementById("player-dividend-yield-label").innerHTML = `DY: ${stock.dividendYield}%`;
        document.getElementById("player-roe-label").innerHTML = `ROE: ${stock.roe}%`;
        enterpriseCards.splice(enterpriseCards.indexOf(stock), 1);
        console.log(`player tickers: ${playerSortedCards}`);
    }
});

const enterpriseCardsCopy = JSON.parse(JSON.stringify(enterpriseCards));

const clickOponentSortCardBtn = () => {
    document.getElementById("oponent-sort-btn").click();
}

const maxCards = enterpriseCards.length;

document.getElementById("oponent-sort-btn").addEventListener("click", () => {
    let stock = sortCard(enterpriseCardsCopy);
    console.log(stock);
    oponentSortedCards.push(stock.ticker);
    console.log(`oponent sorted cards: ${oponentSortedCards}`);
    if(playerSortedCards[playerSortedCards.length - 1] !== oponentSortedCards[oponentSortedCards.length - 1] ) {
        console.log(`oponent tickers: ${oponentSortedCards}`);
        document.getElementById("logo-stock-oponent").src=stock.image;
        document.getElementById("oponent-price-over-profits-label").innerHTML = `P/L: ${stock.priceOverProfits}`;
        document.getElementById("oponent-dividend-yield-label").innerHTML = `DY: ${stock.dividendYield}%`;
        document.getElementById("oponent-roe-label").innerHTML = `ROE: ${stock.roe}%`;
        enterpriseCardsCopy.splice(enterpriseCardsCopy.indexOf(stock), 1);
    } else if (playerSortedCards[playerSortedCards.length - 1] === oponentSortedCards[oponentSortedCards.length - 1] && playerSortedCards.length === maxCards){
        console.log("Empate na última rodada, sem pontos adicionados")
    } else {
        while(playerSortedCards[playerSortedCards.length - 1] === oponentSortedCards[oponentSortedCards.length - 1]){
            oponentSortedCards.splice(oponentSortedCards.indexOf(stock), 1);
            console.log(oponentSortedCards);
            console.log(`Desculpe, mesma carta: ${stock.ticker}`)
            console.log(stock)
            clickOponentSortCardBtn();
        }
    }
});