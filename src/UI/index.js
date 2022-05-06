
import styled from 'styled-components'


export const H1NotFound = styled.h1`

    color: rgba(94, 78, 123, 0.786);

`

export const H1 = styled.h1`

    text-align: center;

    @media(max-width: 560px) {
        
        font-size: 15pt;
    }

`

export const Table = styled.table`

    width: 100%;
	margin-bottom : .5em;
    table-layout: fixed;

    @media(max-width: 1100px) {
        
        td {
            font-size: 8pt;
        }

        th {
            
            font-size: 8pt;
        }                
    }    

    @media(max-width: 560px) {
        
        td {
            padding: 0.1em;
            font-size: 6pt;
        };

        th {
            padding: .1em;            
            font-size: 5pt;
        };
        
        svg {
            font-size: 10pt;
        };
    }    

`


export const Tr = styled.tr`

    font-weight: 500;
    pointer: true;
    color: ${props => {
        if(props.total>0) {
           
            return 'green'
        } else if(props.total<0){
            
            return '#d55f5f'
        } else {
            return 'black'
        }}
    };
    opacity: ${props => props.delClass==='fade' ? 0 : 1};
    transition: all 530ms; 
    :hover {
        background-color: rgba(94, 78, 123, 0.186);
    }

`

export const Td = styled.td`

    padding: .3em;
	margin: 0;
	border: 1px solid #ccc;
	text-align: center;
    font-size: 10pt;

    svg {
        cursor: pointer;
        color: #9699ac;
        font-size: 20pt;
    }

    @media(max-width: 560px) {
               
        svg {
            font-size: 12pt;
        };
    }    

    

`
export const TDgo = styled.td`

    padding: .7em;
    cursor: pointer;
	margin: 0;
	border: 1px solid #ccc;
	text-align: center;
    font-size: 10pt;
   
`

export const TrFooter = styled.tr`

    font-weight: 500;
    
`

export const Th = styled.th`

    padding: .5em;
	margin: 0;
	border: 1px solid #ccc;
	text-align: center;
    font-weight: 620;
	background-color: #EEE;
	font-size: 10pt;

    @media(max-width: 1000px) {
        th {
         font-size: 8pt;
        }
    }
    
`

export const H4User = styled.h4`

    font-size: 17pt;
    color: rgb(158, 158, 158);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

`

export const FormSell = styled.div`

    opacity: ${props => props.hide? "1" : "0"};
    height: ${props => props.hide? "80px" : "0"};
    overflow: ${props => props.hide? "visible" : "hidden"};
    transition: height 1000ms 0ms, opacity 1000ms 0ms, display 1000ms;

    @media(max-width: 560px) {

        height: ${props => props.hide? "140px" : "0"};
    }


    
`

export const DivUser = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 35vh;
    justify-content: space-between;

`
export const DivTradeList = styled.div`

    font-size: 12pt;
    @media(max-width: 560px) {

        font-size: 8pt;
    }



`


export const DivApi = styled.div`

    display: flex;
    justify-Content: center;
    margin: 20px 0;
    p {
        margin-right: 20px
    }
    
    

    @media(max-width: 560px) {

        align-items: center;
        justify-content: center;
        font-size: 6pt;
        margin: 10px 0; 
       
        button {
            font-size: 5pt;
            padding: 4px;
        };

`

export const FormAdd = styled.form`

    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

        button {
            font-size: 6pt;
            width: 50%;
            margin: auto;
            };

        div {
            
            width: 95%;
        };

    @media(max-width: 1000px) {
        
        justify-content: center;
        
        button {
            font-size: 3pt;
            margin: auto;
        };
        
    }

    @media(max-width: 560px) {

        flex-direction: row;
        flex-wrap: wrap;
        align-items: center; 

        input {
            font-size: 7pt;
        };
        label {
            font-size: 7pt;
        }
        div {
            max-width: 150px;
            margin-right: 15pt;
            max-height: 25px;
        }
        button {
            padding: .8em;
            max-width: 20px;
        }
        
    }    

`


