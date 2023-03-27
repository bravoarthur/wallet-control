import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { H1NotFound } from "UI";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <Box
                display={"flex"}
                justifyContent={"center"}
                height={"200px"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <H1NotFound data-testid="h1NotFound">
                    {" "}
                    PAGE NOT FOUND{" "}
                </H1NotFound>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/gh-wallet-control/home")}
                >
                    Home Page
                </Button>
            </Box>
        </div>
    );
}

export default NotFound;

