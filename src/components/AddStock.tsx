import {
    Button,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import { StockListContext } from "common/context/StockListContext";
import { useContext } from "react";
import { useState } from "react";
import React from "react";
import { FormAdd } from "UI";
import { Box } from "@mui/system";
//import { IStock, IStockAdd, IStockList } from 'types/Stock';

/*
interface PropsContext {

    stockList: IStockList,
    setStockList: React.Dispatch<React.SetStateAction<IStockList>>,
    addNewStock: (stock: IStockAdd) => void
    
}
*/

function AddStock() {
    const { addNewStock } = useContext(StockListContext);

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState("");
    const [qtd, setQtd] = useState<number>();
    const [price, setPrice] = useState<number>();

    return (
        <Container>
            <FormAdd
                onSubmit={(event: any) => {
                    event.preventDefault();
                    addNewStock({
                        stockName: name,
                        buyDate: date,
                        qtdStock: qtd,
                        pricePaid: price
                    });
                    setQtd(undefined);
                    setPrice(undefined);
                }}
            >
                <TextField
                    id="name-outlined-basic"
                    label="Ticker Name"
                    value={name}
                    sx={{ m: 1 }}
                    size="small"
                    required
                    variant="outlined"
                    onChange={(event) =>
                        setName(event.target.value.toUpperCase())
                    }
                />

                <TextField
                    id="date-outlined-basic"
                    label="Buy Date"
                    size="small"
                    required
                    type="date"
                    sx={{ m: 1 }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <TextField
                    id="numberStock"
                    variant="outlined"
                    type="number"
                    required
                    size="small"
                    sx={{ m: 1 }}
                    inputProps={{ min: 0 }}
                    label="Number of Stocks"
                    value={qtd === undefined ? "" : qtd}
                    onChange={(event) => setQtd(Number(event.target.value))}
                />

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                        Stock Price
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={price === undefined ? "" : price}
                        startAdornment={
                            <InputAdornment
                                sx={{ flexShrink: 4 }}
                                position="start"
                                className="adornment"
                            >
                                $
                            </InputAdornment>
                        }
                        label="Stock Price"
                        required
                        size="small"
                        type="number"
                        onChange={(event) =>
                            setPrice(Number(event?.target.value))
                        }
                    />
                </FormControl>

                <Box display={"flex"} alignItems={"center"}>
                    <Button variant="contained" type="submit">
                        Add Stock
                    </Button>
                </Box>
            </FormAdd>
        </Container>
    );
}

export default AddStock;
