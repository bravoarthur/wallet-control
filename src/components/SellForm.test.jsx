import {fireEvent, render,  screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { StockListContext } from "common/context/StockListContext"
import { TradeListContext } from "common/context/TradeListContext";
import SellForm from "./SellForm";


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
    buyDate: '2020-08-10',
    qtdStock: 100,
    avaragePrice: 68.50,
    currentPrice: 69.50,
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
        <TradeListContext.Provider value={{
            formHandle: props.formHandle,
            saveTradeList: props.saveTradeList,
            formDisplay: props.formDisplay
        }}>
            <StockListContext.Provider value={{
                stockList: props.stockList,
                sellStock: props.sellStock
                }}>
                <SellForm/>
            </StockListContext.Provider>
        </TradeListContext.Provider>
    )
}

const mockedSellStock = jest.fn()
const mockedFormHandle = jest.fn()
const mockedSaveTradeList = jest.fn()
const mockedFormDisplay = jest.fn()

describe('SellForm', () => {
    it('Function sellStock is Called with right args', () => {
        wrapper({
            stockList: mockedStockList,
            sellStock: mockedSellStock,
            formHandle: mockedFormHandle,
            saveTradeList: mockedSaveTradeList,
            formDisplay: mockedFormDisplay
        })
        
        const name = screen.getByLabelText('Stock Name *')
        const date = screen.getByLabelText('date *')
        const qtd = screen.getByLabelText('Qtd Stocks to Sell *')
        const price = screen.getByLabelText('Sell Price')
        const button = screen.getByText('Confirm')
        userEvent.clear(name) //erase mockConstructor                                   
        userEvent.type(name, 'TICKER3')
        userEvent.type(date, '2020-10-08')
        userEvent.type(qtd, '10')
        userEvent.type(price, '25')
        
        expect(name).toHaveValue('TICKER3')
        expect(date).toHaveValue('2020-10-08')
        expect(qtd).toHaveValue(10)
        expect(price).toHaveValue(25)

        userEvent.click(button)
        expect(mockedSellStock).toHaveBeenCalledWith('TICKER3', 10)
    })

    it('Function sellStock is not called because the sell qtd is higher than the Stocks available', () => {
        wrapper({
            stockList: mockedStockList,
            sellStock: mockedSellStock,
            formHandle: mockedFormHandle,
            saveTradeList: mockedSaveTradeList,
            formDisplay: mockedFormDisplay
        })
        
        const name = screen.getByLabelText('Stock Name *')
        const date = screen.getByLabelText('date *')
        const qtd = screen.getByLabelText('Qtd Stocks to Sell *')
        const price = screen.getByLabelText('Sell Price')
        const button = screen.getByText('Confirm')
        userEvent.clear(name) //erase mockConstructor                                   
        userEvent.type(name, 'TICKER3')
        userEvent.type(date, '2020-10-08')
        userEvent.type(qtd, '110')
        userEvent.type(price, '25')
        
        userEvent.click(button)
        expect(mockedSellStock).not.toHaveBeenCalled()
    })
    it('Function sellStock is not called because the Stock doesn`t exist', () => {
        wrapper({
            stockList: mockedStockList,
            sellStock: mockedSellStock,
            formHandle: mockedFormHandle,
            saveTradeList: mockedSaveTradeList,
            formDisplay: mockedFormDisplay
        })
        
        const name = screen.getByLabelText('Stock Name *')
        const date = screen.getByLabelText('date *')
        const qtd = screen.getByLabelText('Qtd Stocks to Sell *')
        const price = screen.getByLabelText('Sell Price')
        const button = screen.getByText('Confirm')
        userEvent.clear(name)                        
        userEvent.type(name, 'TICKERR3')
        userEvent.type(date, '2020-10-08')
        userEvent.type(qtd, '10')
        userEvent.type(price, '25')
        userEvent.click(button)
        expect(mockedSellStock).not.toHaveBeenCalled()
    })
    it('Function saveTradeList is called with right Args', () => {
        wrapper({
            stockList: mockedStockList,
            sellStock: mockedSellStock,
            formHandle: mockedFormHandle,
            saveTradeList: mockedSaveTradeList,
            formDisplay: mockedFormDisplay
        })
        
        const name = screen.getByLabelText('Stock Name *')
        const date = screen.getByLabelText('date *')
        const qtd = screen.getByLabelText('Qtd Stocks to Sell *')
        const price = screen.getByLabelText('Sell Price')
        const button = screen.getByText('Confirm')
        userEvent.clear(name) //erase mockConstructor                                   
        userEvent.type(name, 'TICKER3')
        userEvent.type(date, '2020-10-08')
        userEvent.type(qtd, '10')
        userEvent.type(price, '70.50')
        const mockedNewSell = {
            stockName: 'TICKER3',
            buyDate: '2020-08-10',
            sellDate: '2020-10-08',
            qtdSold: 10,
            buyPrice: 68.5,
            sellPrice: 70.50,
            valuetion: ((70.50 * 10)-(68.50 * 10)),
            valuetionPercent: ((70.50 / 68.50)-1)*100,
            valuetionPY: ((70.50 / 68.50)-1)*100        
        }       
        userEvent.click(button)
        expect(mockedSaveTradeList).toHaveBeenCalledWith(mockedNewSell)
    })
})
