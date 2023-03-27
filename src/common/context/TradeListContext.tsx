import React, { useContext } from "react";
import { ReactNode, useState, createContext } from "react";
import { ITradeItem, ITradeList } from "types/Trade";
import { UserContext } from "./UserContext";

interface TradeListProps {
    tradeList: ITradeList | [];
    setTradeList: React.Dispatch<React.SetStateAction<ITradeList>>;
    formDisplay: (name?: string) => void;
    formHandle: TformHandle;
    saveTradeList: (list: ITradeItem) => void;
}

type TradeListContextProps = {
    children: ReactNode;
    //children: JSX.Element
};

type TformHandle = {
    name: string;
};

//export const TradeListContext = createContext<StockListProps>({} as StockListProps)
export const TradeListContext = createContext<TradeListProps>(
    {} as TradeListProps
);

export const TradeListProvider = ({ children }: TradeListContextProps) => {
    const { user } = useContext(UserContext);

    const [tradeList, setTradeList] = useState<ITradeList>([]);

    const [formHandle, setFormHandle] = useState<TformHandle>({ name: "" });

    function formDisplay(name?: string) {
        setFormHandle({ name: name ? name : "" });
    }

    function saveTradeList(list: ITradeItem) {
        const newTradeList = [...tradeList, list];

        setTradeList(newTradeList);
        localStorage.setItem(`${user}TradeList`, JSON.stringify(newTradeList));
    }

    return (
        <TradeListContext.Provider
            value={{
                tradeList,
                setTradeList,
                formDisplay,
                formHandle,
                saveTradeList
            }}
        >
            {children}
        </TradeListContext.Provider>
    );
};

