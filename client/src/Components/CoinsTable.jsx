import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useEffect } from 'react'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'




const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const {currency } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)
    }

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
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
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
                                        <TableCell style={{
                                            color: "black",
                                            fontWeight: '700',
                                            fontFamily:"Montserrat"
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
                                            handleSearch().map(row => {
                                                const profit = row.price_change_percentage_24h > 0;

                                                return (
                                                    <TableRow
                                                        onClick={
                                                            ()=>history.pushState(`/coins/${row.id}`)
                                                        }
                                                        className={classes.row}
                                                        key={row.name}
                                                    ></TableRow>
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