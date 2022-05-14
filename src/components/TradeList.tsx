import React from 'react';
import {useContext} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import { TradeListContext } from 'common/context/TradeListContext';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Box } from '@mui/material';
import { DivTradeList } from 'UI';


type Tclick = React.MouseEvent<HTMLDivElement, MouseEvent>

interface Props {
    children:string
}


function TradeList({children}:Props) {

  
  const {tradeList} = useContext(TradeListContext)
  const [open, setOpen] = React.useState(false);
  const list = children? tradeList.filter(item => item.stockName===children) : tradeList
  console.log(children)
     
  const handleClick = (event:Tclick) => {
    setOpen(!open);
    const foco = event.currentTarget
    
    setTimeout(() => {foco.scrollIntoView({behavior: 'smooth'})}, 400)
      
  };
  

  let appreciation = 0


  return (

    <Box display={'flex'} justifyContent={'center'} >

        <List
        sx={{ width: 'auto', maxWidth: 700, bgcolor: 'background.paper'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        
        >
        
        
        <ListItemButton onClick={(event) => handleClick(event)}>
                        
            <ListItemText>
                <Box fontWeight={700} fontSize={13}>

                    List of Sold Stocks

                </Box>

            </ListItemText>

            {open ? <ExpandLess /> : <ExpandMore />}
            
        </ListItemButton>
        <Collapse in={open}  timeout="auto" unmountOnExit >
            <List component="div"  disablePadding >

                {list.map((item, index) => {
                    appreciation +=item.valuetion

                return (
                    
                    

                    <ListItemButton sx={{ pl: 4}} key={index}>
                        <ListItemIcon>
                            <DoneIcon/>
                        </ListItemIcon>
                        
                        <ListItemText>
                            <DivTradeList role='trade-list-item'>

                                {`${item.sellDate} - Sold ${item.qtdSold} stocks ${item.stockName} for $${item.sellPrice?.toFixed(2)} | ${item.valuetionPY.toFixed(2)}% | Balance: $ ${item.valuetion.toFixed(2)}`}
                            </DivTradeList>


                        </ListItemText>
                    </ListItemButton>
                   
                )
                })}

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <NavigateNextIcon/>
                        </ListItemIcon>

                        <ListItemText>
                            <DivTradeList>

                                <Box fontWeight={600} m={1}  fontFamily="Segoe UI" textAlign='center'>
                                Total Wallet Appreciation $ {appreciation.toFixed(2)}

                                </Box>
                            </DivTradeList>
                        </ListItemText>

                        <ListItemIcon>
                            <NavigateBeforeIcon/>
                        </ListItemIcon>
                    </ListItemButton>

            </List>
        </Collapse>
        </List>
    </Box>
  );
}




export default TradeList;