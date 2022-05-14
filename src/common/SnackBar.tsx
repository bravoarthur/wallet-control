import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { StockListContext } from './context/StockListContext';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    
  const {snack, handleSnackBar} = useContext(StockListContext)
 
  
    
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {

            return;
        }        

        handleSnackBar({status: false, severity: 'success', text:''});
    };
    

    return (
      <Stack spacing={2} sx={{ width: '100%' }}>  
        <Snackbar open={snack.status} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} >
          <Alert onClose={handleClose} severity={snack.severity} sx={{ width: '100%'}}>
            {snack.text}
          </Alert>
        </Snackbar>
        
      </Stack>
  );
}
