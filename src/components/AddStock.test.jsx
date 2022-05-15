import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StockListContext } from "common/context/StockListContext";
import AddStock from "./AddStock";

const wrapper = (props) => {
    render(
        <StockListContext.Provider
            value={{
                addNewStock: props.addNewStock
            }}
        >
            <AddStock />
        </StockListContext.Provider>
    );
};

const mockedAddNewStock = jest.fn();

describe("AddStock form", () => {
    it("Function addNewStock is Called with right args", () => {
        wrapper({
            addNewStock: mockedAddNewStock
        });

        const stockName = screen.getByLabelText("Ticker Name *");
        const buyDate = screen.getByLabelText("Buy Date *");
        const qtd = screen.getByLabelText("Number of Stocks *");
        const price = screen.getByLabelText("Stock Price");
        const button = screen.getByText("Add Stock");

        userEvent.type(stockName, "NEWTICKER");
        userEvent.type(buyDate, "2020-10-08");
        userEvent.type(qtd, "10");
        userEvent.type(price, "25");

        expect(stockName).toHaveValue("NEWTICKER");
        expect(buyDate).toHaveValue("2020-10-08");
        expect(qtd).toHaveValue(10);
        expect(price).toHaveValue(25);

        userEvent.click(button);
        expect(mockedAddNewStock).toHaveBeenCalledWith({
            stockName: "NEWTICKER",
            buyDate: "2020-10-08",
            qtdStock: 10,
            pricePaid: 25
        });
    });
});
