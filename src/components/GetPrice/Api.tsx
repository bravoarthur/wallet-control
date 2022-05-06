

async function Api(stockName:string) {

    const API_KEY = '03421e3e'
    const URL = `https://api.hgbrasil.com/finance/stock_price?key=${API_KEY}&symbol=${stockName}&format=json-cors`

    
    /*
    const options = {        
            method: 'GET',
            mode: 'cors',
            cache: 'default',                   
    }
    */



    return await fetch(URL, {        
        method: 'GET',
        mode: 'cors',
        cache: 'default',                   
})
    .then(response => {
        console.log(response)
        return response.json()})
    .then(response => {
        console.log(response)
        return response
    })
    //.then(response => response.quoteResponse.result[0].regularMarketPrice)
    //.then(response => response.results[stockName].price)
    .then(response => response.results[stockName])
    .catch(err => console.log(err))

}

export default Api;