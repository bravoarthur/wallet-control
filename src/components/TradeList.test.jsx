import {fireEvent, render,  screen} from "@testing-library/react"
import { TradeListContext } from "common/context/TradeListContext"
import TradeList from "./TradeList"


const mockedTradeList = [{
    stockName: 'TICKER3',
    buyDate: '2021-10-08',
    sellDate: '2022-08-20',
    qtdSold: 10,
    buyPrice: 25.50,
    sellPrice: 26.50,
    valuetion: 10,
    valuetionPercent: 3.92,
    valuetionPY: 3.92  
}, {
    stockName: 'TICKER6',
    buyDate: '2022-01-20',
    sellDate: '2022-03-20',
    qtdSold: 12,
    buyPrice: 30,
    sellPrice: 25,
    valuetion: -60,
    valuetionPercent: -16.66,
    valuetionPY: -16.66       
}]

const wrapper = (props) => {
    render(
        <TradeListContext.Provider value={{
            tradeList: props.tradeList,            
            }}>
            <TradeList name={props.stockName}/>
        </TradeListContext.Provider>
    )
}

describe('Trade List', () => {
    it('Shows all trades when is not receiving Props (home trade list)', () => {
        wrapper({
            tradeList: mockedTradeList,
            stockName: undefined
        })
        const button = screen.getByText('List of Sold Stocks')
        fireEvent.click(button)
        const tradeListItems = screen.getAllByRole('trade-list-item')
        expect(tradeListItems.length).toBe(mockedTradeList.length)

    })
})
