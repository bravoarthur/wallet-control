import React, { useContext, useEffect } from "react";
import { ReactNode, useState, createContext } from "react";
import { IStockAdd, IStockList } from "types/Stock";
import { TSnackBar } from "types/TSnackBar";
import { TradeListContext } from "./TradeListContext";
import { UserContext } from "./UserContext";

type StockListContextProps = {
    children: ReactNode;
    //children: JSX.Element
};

interface StockListProps {
    stockList: IStockList | [];
    setStockList: React.Dispatch<React.SetStateAction<IStockList>>;
    addNewStock: (stock: IStockAdd) => void;
    saveList: (newList: IStockList) => void;
    deleteStock: (stockName: string) => void;
    sellStock: (stockName: string, qtdSold: number) => void;
    valuetionPercentYear: (
        date: string,
        current: number,
        avarage: number | undefined
    ) => string;
    handleSnackBar: ({ status, severity, text }: TSnackBar) => void;
    snack: TSnackBar;
}

export const StockListContext = createContext<StockListProps>(
    {} as StockListProps
);
//export const StockListContext = createContext<StockListProps | null>(null)

export const StockListProvider = ({ children }: StockListContextProps) => {
    const { user } = useContext(UserContext);
    const { setTradeList } = useContext(TradeListContext);
    const [stockList, setStockList] = useState<IStockList>([]);

    const [snack, setSnack] = useState({
        status: false,
        severity: "",
        text: ""
    });

    useEffect(() => {
        setStockList(
            JSON.parse(`${localStorage.getItem(`stock${user}`)}`) || []
        );
        setTradeList(
            JSON.parse(`${localStorage.getItem(`${user}TradeList`)}`) || []
        );
    }, [user, setTradeList]);

    function handleSnackBar({ status, severity, text }: TSnackBar) {
        setSnack({ status, severity, text });
    }

    function addNewStock({
        stockName,
        buyDate,
        qtdStock,
        pricePaid
    }: IStockAdd) {
        const verf = stockList.findIndex(
            (item) => item.stockName === stockName
        );

        if (verf < 0) {
            const newStock = {
                companyName: "",
                stockName: stockName,
                buyDate: buyDate,
                qtdStock: qtdStock,
                avaragePrice: pricePaid,
                currentPrice: 0,
                webSite: "",
                description: ""
            };
            saveList([...stockList, newStock]);
            handleSnackBar({
                status: true,
                severity: "success",
                text: `New Stock ${stockName} Added Successfully`
            });
        } else {
            const newAvaragePrice =
                (Number(stockList[verf].avaragePrice) *
                    Number(stockList[verf].qtdStock) +
                    Number(pricePaid) * Number(qtdStock)) /
                (Number(stockList[verf].qtdStock) + Number(qtdStock));

            const newStock = {
                companyName: stockList[verf].companyName,
                stockName: stockName,
                buyDate: stockList[verf].buyDate,
                qtdStock: Number(stockList[verf].qtdStock) + Number(qtdStock),
                avaragePrice: newAvaragePrice,
                currentPrice: stockList[verf].currentPrice,
                webSite: "",
                description: ""
            };

            saveList(
                stockList.map((item, index) => {
                    if (index === verf) {
                        return newStock;
                    } else {
                        return item;
                    }
                })
            );
            handleSnackBar({
                status: true,
                severity: "success",
                text: `${qtdStock} new ${stockName} Stock ${
                    qtdStock! > 1 ? "have" : "has"
                } been Added Successfully`
            });
        }
    }

    function sellStock(stockName: string, qtdSold: number) {
        const verf = stockList.findIndex(
            (item) => item.stockName === stockName
        );

        if ((stockList[verf].qtdStock as number) - qtdSold === 0) {
            saveList(
                stockList.filter((item) => {
                    return item.stockName !== stockName;
                })
            );
            handleSnackBar({
                status: true,
                severity: "success",
                text: `All Stocks ${stockName} has been Sold!`
            });
        } else {
            const newStock = {
                companyName: stockList[verf].companyName,
                stockName: stockName,
                buyDate: stockList[verf].buyDate,
                qtdStock: (stockList[verf].qtdStock as number) - qtdSold,
                avaragePrice: stockList[verf].avaragePrice,
                currentPrice: stockList[verf].currentPrice,
                webSite: stockList[verf].webSite,
                description: stockList[verf].description
            };

            saveList(
                stockList.map((item, index) => {
                    if (index === verf) {
                        return newStock;
                    } else {
                        return item;
                    }
                })
            );
            handleSnackBar({
                status: true,
                severity: "success",
                text: `${qtdSold} Stock${qtdSold > 1 ? "s" : ""} ${stockName} ${
                    qtdSold > 1 ? "have" : "has"
                } been Sold!`
            });
        }
    }

    function saveList(newList: IStockList) {
        localStorage.setItem(`stock${user}`, JSON.stringify(newList));
        setStockList(newList);
    }

    function deleteStock(stockName: string) {
        handleSnackBar({
            status: true,
            severity: "warning",
            text: `The Stock ${stockName} has been deleted!!`
        });
        saveList(
            stockList.filter((item) => {
                return item.stockName !== stockName;
            })
        );
    }

    function valuetionPercentYear(
        date: string,
        current: number,
        avarage: number | undefined
    ) {
        let vPercentYear = (current / Number(avarage) - 1) * 100;

        const now = new Date(); // Data de hoje
        const past = new Date(date); // Outra data no passado
        const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

        if (days / 365 >= 1) {
            return (vPercentYear / (days / 365)).toFixed(2);
        } else {
            return vPercentYear.toFixed(2);
        }
    }

    return (
        <StockListContext.Provider
            value={{
                stockList,
                setStockList,
                addNewStock,
                saveList,
                deleteStock,
                sellStock,
                valuetionPercentYear,
                handleSnackBar,
                snack
            }}
        >
            {children}
        </StockListContext.Provider>
    );
};

