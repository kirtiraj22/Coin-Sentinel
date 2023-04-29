import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useEffect } from 'react'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useStyles, makeStyles } from 'tss-react/mui'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carousel'




const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const {currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)
    }

    const useStyles = makeStyles()(()=>{
        return{
            row:{
                backgroundColor: "#16171a",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#131111",
                },
                fontFamily: "Montserrat"
            },
        };
    });
    

    // const { classes } = useStyles;
    const classes = useStyles;
    const navigate = useNavigate();
    console.log(coins);

    useEffect(() => {
      fetchCoins();
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })
    const handleSearch = () => {
        return coins.filter((coins) => (
            coins.name.toLowerCase().includes(search) || 
            coins.symbol.toLowerCase().includes(search)
        ))
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{
            textAlign: "center"
        }}>
            <Typography
                variant='h4'
                style={{
                    margin:18,
                    fontFamily: "Montserrat"
                }}
            >
                Cryptocurrency Prices
            </Typography>

            <TextField
             id='outlined-basic'
             label="Search for a Crypto Currency..." variant='outlined' 
             
            style={{
                marginBottom: 20,
                width: "100%",
                background: "#e6deecd1"
            }}
            onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{
                            backgroundColor: "gold"
                        }}/>
                    ) : (
                        <Table>
                            <TableHead style={{backgroundColor: "#eebc1d"}}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    //     <TableCell
                                    //     style={{
                                    //       color: "black",
                                    //       fontWeight: "700",
                                    //       fontFamily: "Montserrat",
                                    //     }}
                                    //     key={head}
                                    //     align="right"
                                    //   >
                                        <TableCell
                                        style={{
                                          color: "black",
                                          fontWeight: "700",
                                          fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                      >
                                        {head}
                                      </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                        {
                                            handleSearch().map((rows) => {
                                                const profit = rows.price_change_percentage_24h > 0;

                                                return (
                                                    <TableRow
                                                        onClick={
                                                            ()=>navigate(`/coins/${rows.id}`)
                                                        }
                                                        className={classes.row}
                                                        key={rows.name}
                                                    >
                                                         <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                        >
                                                        <img
                                                            src={rows?.image}
                                                            alt={rows.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                            >
                                                            {rows.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}>
                                                            {rows.name}
                                                            </span>
                                                        </div>
                                                        </TableCell>
                                                        <TableCell align="right"
                                                        style={{
                                                            color: "white",
                                                        }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(rows.current_price.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}
                                                        >
                                                        {profit && "+"}
                                                        {rows.price_change_percentage_24h.toFixed(2)}%
                                                        </TableCell>
                                                        <TableCell 
                                                        align="right"
                                                        style={{
                                                          color: "white",
                                                        }}
                                                        >
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            rows.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable