import { IStock } from "types/Stock";
import { Td, TDgo, Tr } from "UI";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useContext, useState } from "react";
import { StockListContext } from "common/context/StockListContext";
import { TradeListContext } from "common/context/TradeListContext";
import { useNavigate } from "react-router-dom";




function List (item:IStock) {

    const {deleteStock, valuetionPercentYear} = useContext(StockListContext)
    
    const {formDisplay} = useContext(TradeListContext)

    const navigate = useNavigate()

    const [classProp, setClassProp] = useState<undefined|string>()
    
    const {stockName, avaragePrice, buyDate, currentPrice, qtdStock} = item

    const valuetionPercent = ((currentPrice / Number(avaragePrice))-1)*100

    const lossOrProfit = (currentPrice*Number(qtdStock)) - (Number(avaragePrice) * Number(qtdStock))

        
    const _handleDelete = () => {
        
        if(window.confirm('Are you Sure...')===true){

            setClassProp('fade')
            setTimeout(() => deleteStock(stockName), 700)
                
        } else {
            console.log('Delete has been Cancelled ')
        }

    }

    const _handleStockPage = () => {
        navigate(`/stock/${stockName}`)
    }


    return (

        <Tr delClass={classProp} total={currentPrice===0 ? 0 : lossOrProfit}  key={stockName}>                    
    
            <TDgo onClick={_handleStockPage}>{stockName}</TDgo>
            <Td>{buyDate}</Td>
            <Td>{qtdStock}</Td>
            <Td>{avaragePrice?.toFixed(2)}</Td>
            <Td>{currentPrice?.toFixed(2)}</Td>
            <Td>{currentPrice===0 ? '0.00' : valuetionPercent.toFixed(2)}%</Td>
            <Td>{currentPrice===0 ? '0.00' : lossOrProfit.toFixed(2)}</Td>
            <Td>{currentPrice===0 ? '0.00' : valuetionPercentYear(buyDate, currentPrice, avaragePrice)}%</Td>
            <Td>
                <DeleteForeverIcon sx={{fontSize: 40}} onClick={_handleDelete}/>
            </Td>
            <Td>
                <CurrencyExchangeIcon sx={{fontSize: 30}}
                onClick={() => formDisplay(stockName)}/>
            </Td>
          
        </Tr>

    );

}

export default List;