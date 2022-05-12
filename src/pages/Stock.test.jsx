import React from "react";
import {fireEvent, render, screen} from "@testing-library/react"
import UserPage from "./UserPage"
import userEvent from '@testing-library/user-event'
import Stock from "./Stock";
import { StockListContext } from "common/context/StockListContext";

const mockedUsedNavigate = jest.fn();
const mockedUsedParams = jest.fn();
      jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
                useNavigate: () => mockedUsedNavigate,
                useParams: () => mockedUsedParams,
        }));
mockedUsedParams.mockReturnThis(1)

describe('Stock Information', () => {
    it('Stock name', () => {
        render(
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
        )

        const nameP = screen.getByRole('nameItem')

        expect(nameP).tobe('Teste')   
        
                    
    })

    it('Go to Next page', () => {
        render()

        

    })

})
