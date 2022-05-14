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