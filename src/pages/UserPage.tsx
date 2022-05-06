import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { UserContext } from "common/context/UserContext";
import FreeSoloCreateOption from "components/UserSelector";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DivUser, H4User } from "UI";


function UserPage() {

    const navigate = useNavigate()
    const newLogin = useContext(UserContext)
   
    
    return ( 
        <DivUser>

            <Box>

                <H4User>Choose an existent Wallet or Create a new one:</H4User>

            </Box>

            <Box>

                <FreeSoloCreateOption/>

            </Box>

            <Box>

                <Button variant="outlined"  onClick={() => navigate('/home')} disabled={newLogin.newLogin ? true : false }>
                    Enter
                </Button>

            </Box>

        </DivUser>

    );
}

export default UserPage;