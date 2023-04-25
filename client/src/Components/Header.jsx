import React from 'react'
import { useNavigate } from "react-router-dom"
import { AppBar,MenuItem, Container, Toolbar, Typography, Select, createTheme, ThemeProvider } from '@mui/material';
import "./header.css"
const Header = () => {
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={()=> navigate("/")} className="title">
                    CoinSentinel
                </Typography>
                <Select labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age" 
                variant="outlined" 
                style={{
                    width:100,
                    height:40,
                    marginLeft:15
                }}>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header