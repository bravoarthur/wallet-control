import React from "react";
import {render,  screen} from "@testing-library/react"
import Stock from "./Stock";
import { StockListContext} from "common/context/StockListContext";


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
    it('Shows Company Name, description and Website',  () => {
        
        render(
            <StockListContext.Provider value={{
                stockList: stockL,
                valuetionPercentYear: jest.fn()
            }}>

                <Stock/>
            </StockListContext.Provider>
        )
                
        const nameP =  screen.getByRole('nameP')
        const descriptionP =  screen.getByRole('descriptionP')
        const websiteP =  screen.getByRole('websiteP')
        
        expect(nameP).toHaveTextContent(stockL[0].companyName)  
        expect(descriptionP).toHaveTextContent(stockL[0].description)
        expect(websiteP).toHaveTextContent(stockL[0].webSite) 
                       
    })

    it('Shows correct "Total Invested" and "Appreciation"', () => {
        render(
            <StockListContext.Provider value={{
                stockList: stockL,
                valuetionPercentYear: jest.fn()
            }}>
                <Stock/>
            </StockListContext.Provider>
        )

        const totalP =  screen.getByRole('totalP')
        const appreciationP =  screen.getByRole('appreciationP')

        const totalInvested = stockL[0].avaragePrice * stockL[0].qtdStock    
        const appreciation = (stockL[0].currentPrice*Number(stockL[0].qtdStock)) - (Number(stockL[0].avaragePrice) * Number(stockL[0].qtdStock))
        
        expect(totalP).toHaveTextContent(`$ ${totalInvested.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`)

        expect(appreciationP).toHaveTextContent(`${appreciation.toFixed(2)}`)

    })

})


