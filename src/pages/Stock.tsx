import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import PercentIcon from "@mui/icons-material/Percent";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { StockListContext } from "common/context/StockListContext";
import { Box } from "@mui/system";
import TradeList from "components/TradeList";
import { useNavigate, useParams } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotFound from "./NotFound";
import { Button } from "@mui/material";

function Stock() {
    const { stockList, valuetionPercentYear } = useContext(StockListContext);
    const { id } = useParams();

    const navigate = useNavigate();

    const stock = stockList.find((item) => item.stockName === id);

    if (stock === undefined) {
        return <NotFound />;
    }

    const appreciationPercent =
        (stock.currentPrice / Number(stock.avaragePrice) - 1) * 100;

    const appreciation =
        stock.currentPrice * Number(stock.qtdStock) -
        Number(stock.avaragePrice) * Number(stock.qtdStock);

    return (
        <Box>
            <Box display={"flex"} justifyContent={"center"} margin={"25px"}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(`/gh-wallet-control/home`)}
                >
                    Back
                </Button>
            </Box>

            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                <Box>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper"
                        }}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountBalanceIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Company Name"
                                secondaryTypographyProps={{ role: "nameP" }}
                                secondary={
                                    stock.companyName ? stock.companyName : ""
                                }
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Stock Ticker"
                                secondary={stock?.stockName}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DescriptionIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Description"
                                secondaryTypographyProps={{
                                    role: "descriptionP"
                                }}
                                secondary={
                                    stock.description
                                        ? stock.description
                                        : "Not Informed"
                                }
                                sx={{ textAlign: "justify" }}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <LanguageOutlinedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="WebSite"
                                secondaryTypographyProps={{ role: "websiteP" }}
                                secondary={
                                    stock.webSite
                                        ? stock.webSite
                                        : "Not Informed"
                                }
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CalendarMonthIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="First Buy"
                                secondary={stock?.buyDate}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AppRegistrationIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Amount"
                                secondary={`${stock?.qtdStock} units `}
                            />
                        </ListItem>
                    </List>
                </Box>

                <Box>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper"
                        }}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BarChartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Total invested"
                                secondaryTypographyProps={{ role: "totalP" }}
                                secondary={`$ ${
                                    stock.avaragePrice && stock.qtdStock
                                        ? (
                                              stock.avaragePrice *
                                              stock.qtdStock
                                          ).toLocaleString("pt-BR", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2
                                          })
                                        : ""
                                }`}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachMoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Avarage Price"
                                secondary={stock?.avaragePrice}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachMoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Current Price"
                                secondary={stock?.currentPrice}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SsidChartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                secondaryTypographyProps={{
                                    role: "appreciationP"
                                }}
                                primary="Appreciation"
                                secondary={`$ ${appreciation.toFixed(2)}`}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PercentIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Appreciation %"
                                secondary={`${appreciationPercent.toFixed(2)}%`}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <TimelineRoundedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Appreciation Per Year"
                                secondary={`${valuetionPercentYear(
                                    stock.buyDate,
                                    stock.currentPrice,
                                    stock.avaragePrice
                                )}%`}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box>

            <Box display={"flex"} justifyContent={"center"}>
                <TradeList>{stock.stockName}</TradeList>
            </Box>
        </Box>
    );
}

export default Stock;
