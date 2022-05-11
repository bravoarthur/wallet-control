import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { StockListContext } from "common/context/StockListContext";
import { TradeListContext } from "common/context/TradeListContext";
import { useContext, useEffect, useState, useRef } from "react";
import { FormAdd, FormSell } from "UI";


type  TError = {
    class: boolean,
    message: string
}

function SellForm() {

    const {formHandle, saveTradeList, formDisplay} = useContext(TradeListContext)
    const {stockList, sellStock} = useContext(StockListContext)

    const inputRef = useRef<HTMLDivElement | null>(null)

    const [stockName, setStockName] = useState('')
    const [stockSellDate, setStockSellDate] = useState('')
    const [stockSellQtd, setStockSellQtd] = useState<number>()
    const [stockSellPrice, setStockSellPrice] = useState<number>()

    const [error, setError] = useState<TError>({class: false, message: ''})
    const [display, setDisplay] = useState(false)

    
    useEffect(() => {

        if(!formHandle.name) {
            return
        }

        setStockName(formHandle.name)
        setDisplay(true)

        //inputRef.current?.querySelectorAll('input')[0].focus({preventScroll: true})
        setTimeout(() =>  inputRef.current?.scrollIntoView({behavior: 'smooth'}), 100)
                       
    }, [formHandle.name])
    
    function newTransaction (verf:number) {

        console.log('vendido')

        const newSell = {

            stockName: stockList[verf].stockName,
            buyDate: stockList[verf].buyDate,
            sellDate: stockSellDate,
            qtdSold: stockSellQtd,
            buyPrice: stockList[verf].avaragePrice,
            sellPrice: stockSellPrice,
            valuetion: ((stockSellPrice! * stockSellQtd!)-(stockList[verf].avaragePrice as number * stockSellQtd!)),
            valuetionPercent: ((stockSellPrice as number / stockList[verf].avaragePrice!)-1)*100,
            valuetionPY: 0

        }
        
        newSell.valuetionPY =  _handleCalcDate(stockList[verf].buyDate, stockSellDate, newSell.valuetionPercent)
        saveTradeList(newSell)
        sellStock(stockName, stockSellQtd as number)        
        setStockSellPrice(undefined)
        setStockSellQtd(undefined)

    }



    const _handleSell = () => {

        const verf = stockList.findIndex(item => stockName === item.stockName) 

        if(verf < 0 ) {
            const errName = {
                class: true,
                message: "This Stock is not in the Wallet"
            }
            console.log('Nome Nao Existe')
            setError(errName)
        } else {
            //exclamacao ao fim obriga o Typescript a aceitar
            if((stockList[verf].qtdStock as number - stockSellQtd!) < 0) {
                const errQtd = {
                    class: true,
                    message: `You can just Sell ${stockList[verf].qtdStock} units`
                }
                
                setError(errQtd)
            } else {

                setError({class: false, message: ''})
                newTransaction(verf)
            }

        } 

    }

    function _handleCancel () {
        setStockName('')
        setStockSellDate('')
        setStockSellPrice(undefined)
        setStockSellQtd(undefined)
        setDisplay(false)
        formDisplay('')

    }
    
    console.log(display)
    

    return ( 

        <Container>

            <FormSell hide={display}>
                <FormAdd onSubmit={
                (event: any) => {
                    console.log(event)
                    event.preventDefault()
                    _handleSell()
                    
                }
                } >

                    <TextField 
                    variant="outlined"
                    ref={inputRef}
                    margin="normal"
                    label="Stock Name"
                    required 
                    id="input-name-sell-stock"
                    size="small"
                    value={stockName}
                    onChange={(event) => setStockName(event.target.value)}                
                    />

                    <TextField
                    variant="outlined"
                    margin="normal"
                    type='date'
                    size="small"
                    InputLabelProps={{shrink: true}}
                    label="date"
                    value={stockSellDate}
                    required
                    onChange={(event) => setStockSellDate(event.target.value)}
                    />

                    <TextField
                    variant="outlined"
                    error={error.class}
                    helperText={error.message}
                    margin="normal"
                    type='number'
                    size="small"
                    inputProps={{"min": 0}}
                    label='Qtd Stocks to Sell'
                    required
                    value={stockSellQtd === undefined ? '' : stockSellQtd}
                    onChange={(event) => setStockSellQtd(Number(event.target.value))}
                    />

                    <FormControl margin="normal" variant="outlined">
                        <InputLabel htmlFor="sell-stock">Sell Price</InputLabel>
                        <OutlinedInput
                            id="sell-stock"
                            startAdornment={<InputAdornment sx={{flexShrink:9}} position="start">$</InputAdornment>}
                            label="Sell Price"
                            size="small"
                            required
                            type="number"
                            value={stockSellPrice === undefined ? '' : stockSellPrice}
                            inputProps={{"min": 0,"step":"0.01" }}
                            onChange={(event) => setStockSellPrice(Number(event.target.value))}
                                        
                        />
                    </FormControl>

                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignContent={'center'}>

                       
                            <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                                             
                            >Confirm</Button>
                                                
                            <Button
                            color="error"
                            variant="outlined" 
                            onClick={_handleCancel}                 
                            >Cancel</Button>
                        
                    </Box>



                </FormAdd>
                            
            </FormSell>

        </Container>


    );
}

export default SellForm;


function _handleCalcDate(buyDate:string, sellDate:string, valuetion: number) {

    const now = new Date(sellDate); // Data de hoje
    
    const past = new Date(buyDate); // Outra data no passado
    
    const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
    
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    
    if(days/365 >= 1) {
        return valuetion/(days/365)
    }else{
        return valuetion
    }

}