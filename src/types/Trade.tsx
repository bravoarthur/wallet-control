export interface ITradeItem {
    stockName: string;
    buyDate: string;
    sellDate: string;
    qtdSold: number | undefined;
    buyPrice: number | undefined;
    sellPrice: number | undefined;
    valuetion: number;
    valuetionPercent: number;
    valuetionPY: number;
}

export interface ITradeList extends Array<ITradeItem> {}
