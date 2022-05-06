import { IStockList } from "types/Stock";
import { Td, Th, Tr, TrFooter } from "UI";


interface Props {

    children: IStockList
}

function ListFooter({children}:Props) {

    const stockList = children
    
    let currentVerifier = false
    let walletInitial = 0
    let walletCurrent = 0
    
    stockList.forEach(item => {

        walletInitial += (Number(item.avaragePrice) * Number(item.qtdStock))
        walletCurrent += (Number(item.currentPrice) * Number(item.qtdStock))
        if(item.currentPrice===0) {
            currentVerifier=true
        }
        }
    )

    const walletValuetion = walletCurrent - walletInitial

    const walletValuetionPerc = ((walletCurrent / walletInitial)-1)*100



    return ( 

        <TrFooter>
                            
            <Th>Wallet Valuetion %</Th>
            <Td> {currentVerifier ? 0 : walletValuetionPerc.toFixed(2)}%</Td>
            <Th>Wallet Valuetion $</Th>
            <Td>$ {currentVerifier ? 0 : walletValuetion.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} </Td>
            <Th>Total Invested</Th>
            <Td>$ {walletInitial.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} </Td>
            <Th>Wallet current Total</Th>
            <Td>$ {currentVerifier ? 0 : walletCurrent.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} </Td>

        </TrFooter>


     );
}

export default ListFooter;