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

const sortPlayerCard = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}

document.getElementById("player-sort-btn").addEventListener("click", () => {
    const stock = sortPlayerCard(enterpriseCards)
    document.getElementById("logo-stock-player").src=stock.image;
    document.getElementById("price-over-profits-label").innerHTML = `P/L: ${stock.priceOverProfits}`;
    document.getElementById("dividend-yield-label").innerHTML = `DY: ${stock.dividendYield}%`;
    document.getElementById("roe-label").innerHTML = `ROE: ${stock.roe}%`;
});