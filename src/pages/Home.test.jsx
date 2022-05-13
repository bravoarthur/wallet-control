import {render,  screen} from "@testing-library/react"
import { StockListContext } from "common/context/StockListContext"
import Home from "./Home"



const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

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
    currentPrice: 8.50,
    webSite: 'www.test2.com.br',
    description: 'Company Test SA2'       
}]


describe('Home list', ()=> {
    it('Show all items in StockList', () => {
        render(
            <StockListContext.Provider value={{
                stockList: mockedStockList,
                valuetionPercentYear: jest.fn()
                }}>
                <Home/>
            </StockListContext.Provider>
        )

        const trList = screen.getAllByTestId('trList')
        //expect(screen.getByText('TICKER3')).toBeInTheDocument()
        expect(mockedStockList.length).toBe(trList.length)
    })
})


