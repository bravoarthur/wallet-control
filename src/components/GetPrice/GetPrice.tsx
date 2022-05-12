import { Button, Container } from "@mui/material";
import { StockListContext } from "common/context/StockListContext";
import { useContext } from "react";
import { IStockList} from 'types/Stock'
import { DivApi } from "UI";
import Api from "./Api";



function GetPrice() {

    const {stockList, saveList} = useContext(StockListContext)

    
    function getPricesApi() {
            
        new Promise((resolve, reject) => {
    
            const updateList:IStockList = []
    
            stockList.map((item) => {
                Api(item.stockName)
                .then((resp) => {                    
                    return {
                    companyName: resp.company_name,
                    stockName: item.stockName,
                    buyDate: item.buyDate,
                    qtdStock: item.qtdStock,
                    avaragePrice: item.avaragePrice,
                    currentPrice: resp.price > 0 ? resp.price : item.currentPrice,
                    webSite: resp.website,
                    description: resp.description                        
                    }
                })
                .then((resp) => {
                    updateList.push(resp)
                    //console.log(updateList)
                    console.log(resp)

                    if(updateList.length===stockList.length){
                        
                        resolve(updateList)
                    }                     

                    return resp
                })
                .catch((err) => console.log(err))
                
                return ''
            })
        
        })
        .then(resp => {
           
            saveList(resp as IStockList)
            //estou dizendo para o TS que esse unknown sera ISTOCKLIST a forca
        })
    }


    return (

        <Container>

            <DivApi>

                    <p> Get Real-Time Prices</p>

                    <Button variant="outlined" onClick={getPricesApi}>Get Prices </Button>

               
            </DivApi>
        </Container>



    )


}

export default GetPrice;



