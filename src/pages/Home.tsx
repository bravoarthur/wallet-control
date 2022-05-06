
import {  Container } from '@mui/material';
import { StockListContext } from 'common/context/StockListContext';
import List from 'components/List/List';
import ListFooter from 'components/List/ListFooter';
import { useContext } from 'react';
import { Table, Th, Tr } from 'UI';

/*
interface PropsContext {

    stockList: IStockList,
    setStockList: React.Dispatch<React.SetStateAction<IStockList>>,
    addNewStock: (stock: IStockAdd) => void
    saveList: (newList: IStockList) => void
    
}*/

function Home() {

    const {stockList} = useContext(StockListContext)

   
    return (  

        <div>

            <Container>


                <Table>

                    <thead>

                        
                        <Tr className="header">

                            <Th>Ticker</Th>
                            <Th>Buy Date</Th>
                            <Th>Qtd Units</Th>
                            <Th>Average Price</Th>
                            <Th>Last Price</Th>
                            <Th>Variation %</Th>
                            <Th>Profit / Loss $</Th>
                            <Th>Variation % a.a</Th>
                            <Th>Delete</Th>
                            <Th>Sell Stocks</Th>

                        </Tr>

                    </thead>



                    <tbody>
                        
                        {stockList.map(item => {

                            return (
                                <List key={item.stockName} {...item} />
                            )                           
                        })}

                    </tbody>
                

                    <tfoot>

                        <ListFooter >
                            {stockList}   
                        </ListFooter>

                    </tfoot>

                </Table>

            </Container>
   

        </div>

    );
}

export default Home;