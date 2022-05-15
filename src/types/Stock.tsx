export interface IStock {
    companyName: string;
    stockName: string;
    buyDate: string;
    qtdStock: number | undefined;
    avaragePrice: number | undefined;
    currentPrice: number;
    webSite: string;
    description: string;
}

export interface IStockAdd {
    stockName: string;
    buyDate: string;
    qtdStock: number | undefined;
    pricePaid: number | undefined;
}

export interface IStockList extends Array<IStock> {}

/*
export interface IStockList {
    list: IStock[]
}
*/
