import {fireEvent, render,  screen} from "@testing-library/react"
import { StockListContext } from "common/context/StockListContext"
import Home from "./Home"


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

/*
jest.mock('components/List/List', () => (jest.requireActual('components/List/List') 
))*/

const mockedStockList = [{
    companyName: 'Company Test',
    stockName: 'TICKER3',
    buyDate: '08/10/1987',
    qtdStock: 100,
    avaragePrice: 65.50,
    currentPrice: 68.50,
    webSite: 'www.test.com.br',
    description: 'Company Test SA'       
}, {
    companyName: 'Company Test2',
    stockName: 'TICKER6',
    buyDate: '08/10/1987',
    qtdStock: 10,
    avaragePrice: 5.50,
    currentPrice: 4.50,
    webSite: 'www.test2.com.br',
    description: 'Company Test SA2'       
}]

const wrapper = (props) => {
    render(
        <StockListContext.Provider value={{
            stockList: props.stockList,
            valuetionPercentYear: props.percYear
            }}>
            <Home/>
        </StockListContext.Provider>
    )
}

const mockedPercYear = jest.fn()

describe('Home list', ()=> {
    
    it('Show all items in StockList', () => {
        wrapper({stockList: mockedStockList, percYear: mockedPercYear})

        const trList = screen.getAllByRole('trList')
         expect(mockedStockList.length).toBe(trList.length)
    })

    it('Show Ticker in correct Table position', () => {
        wrapper({stockList: mockedStockList, percYear: mockedPercYear})

        const tickerField = screen.getByRole(`tickerField${mockedStockList[0].stockName}`)

        expect(tickerField).toHaveTextContent(mockedStockList[0].stockName)
    })
    it('Navigate to Stock Page when click ticker name', () => {
        wrapper({stockList: mockedStockList, percYear: mockedPercYear})

        const tickerField = screen.getByRole(`tickerField${mockedStockList[0].stockName}`)
        fireEvent.click(tickerField)

        expect(mockedUsedNavigate).toHaveBeenCalled()
    })
    it('Stock with negative value is showed in red', () => {
        wrapper({stockList: mockedStockList, percYear: mockedPercYear})
        const tickerField = screen.getAllByRole('trList')
        //const tickerField = await screen.findByRole(`tickerField${mockedStockList[1].stockName}`).then(resp => resp)
        expect(tickerField[1]).toHaveStyle('color: rgb(213, 95, 95)')
    })
})

describe('Footer', () => {
    it('Total invested showed properly', () => {
        wrapper({stockList: mockedStockList, percYear: mockedPercYear})
        const totalInvested = screen.getByRole('totalInvested')
        let mockedTotal = 0
        
        mockedStockList.forEach(item => {
            mockedTotal += item.avaragePrice*item.qtdStock
        })
        //mockedTotal +=1
        expect(totalInvested).toHaveTextContent(`$ ${mockedTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`)        
    }) 

    it('Current Total is Showed Properly', () => {
        wrapper({stockList: mockedStockList, percYear: mockedPercYear})
        const currentTotal = screen.getByRole('currentTotal')
        let mockedCurrentTotal = 0
        mockedStockList.forEach(item => {
            mockedCurrentTotal += item.currentPrice*item.qtdStock
        })
        //mockedTotal +=1
        expect(currentTotal).toHaveTextContent(`$ ${mockedCurrentTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`) 
    })

})
