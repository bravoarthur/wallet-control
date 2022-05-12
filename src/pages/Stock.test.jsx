import React from "react";
import {fireEvent, render,  screen} from "@testing-library/react"
import UserPage from "./UserPage"
import userEvent from '@testing-library/user-event'
import Stock from "./Stock";
import { StockListContext, StockListProvider} from "common/context/StockListContext";


const mockedUsedNavigate = jest.fn();
//const mockedUsedParams = jest.fn();
//mockedUsedParams.mockReturnThis({id:'TICKER3'})
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    useParams: () => ({id: 'TICKER3'}),
}));

const stockL = [{
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

jest.mock("components/TradeList", () => () => {
    const MockName = "default-awesome-component-mock";
    return <MockName />;
  });

describe('Stock Page', () => {
    it('Company Name ', async () => {
        
        render(
            <StockListContext.Provider value={{
                stockList: stockL,
                valuetionPercentYear: jest.fn()
            }}>

                <Stock/>
            </StockListContext.Provider>
        )
                
        const nameP = await screen.findByRole('nameP').then(resp => resp)
        
        expect(nameP).toHaveTextContent(stockL[0].companyName)   
                       
    })
/*
    it('Go to Next page', () => {
        render()

       


    })
*/
})



/*
<StockListContext.Provider value={
                {stockList: [{
                companyName: 'Company Test',
                stockName: 'Ticker Test',
                buyDate: '08/10/1987',
                qtdStock: 100,
                avaragePrice: 65.50,
                currentPrice: 68.50,
                webSite: 'www.test.com.br',
                description: 'Company Test SA'       
            }, {
                companyName: 'Company Test2',
                stockName: 'Ticker Test2',
                buyDate: '08/10/1987',
                qtdStock: 10,
                avaragePrice: 5.50,
                currentPrice: 8.50,
                webSite: 'www.test2.com.br',
                description: 'Company Test SA2'       
            }]}}>
                <Stock/>
            </StockListContext.Provider>
            
            */

            /*
            const StockListProvider = ({children}) => (
    <StockListContext.Provider >
        {children}
    </StockListContext.Provider>
)

const wrapper = ({children}) => (
    <StockListProvider value={stockL}>{children}</StockListProvider>
)


const mockContext = jest.fn().mockImplementation(() => ({
    stockList: stockL,
    valuetionPercentYear: jest.fn()
}))
React.useContext = mockContext*/