import { StockListProvider } from 'common/context/StockListContext';
import { TradeListProvider } from 'common/context/TradeListContext';
import { UserProvider } from 'common/context/UserContext';
import AddStock from 'components/AddStock';
import GetPrice from 'components/GetPrice/GetPrice';
import SellForm from 'components/SellForm';
import Title from 'components/Title';
import TradeList from 'components/TradeList';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Stock from 'pages/Stock';
import UserPage from 'pages/UserPage';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppRouter () {

    return (

        <main>

            <Router>

                <Title/>

                <UserProvider>
                <TradeListProvider>
                <StockListProvider>
                

                    <Routes>

                        <Route path='/' element={<UserPage/>}/>


                        <Route path='/home' element={
                            <>
                                <AddStock/>
                                <GetPrice/>
                                <Home/>
                                <SellForm/>
                                <TradeList/>
                                
                            </>
                        }/>
                       
                        <Route path='stock/:id' element={<Stock/>}/>

                        <Route path='*' element={<NotFound/>}/>
                         

                    </Routes>

                </StockListProvider>
                </TradeListProvider>
                </UserProvider>

            </Router>

        </main>

    )
}

export default AppRouter
