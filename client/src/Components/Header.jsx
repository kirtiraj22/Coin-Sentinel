import React from 'react'
import { useNavigate } from "react-router-dom"
import { makeStyles } from 'tss-react/mui';
import { InputLabel, FormControl, AppBar, MenuItem, Container, Toolbar, Typography, Select, createTheme, ThemeProvider } from '@mui/material';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles()((theme)=>{
    return{
        title: {
            flex: 1,
            color: "gold",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor:"pointer",
        },
    };
});

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
})
const Header = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position='static'>
            <Container>
                <Toolbar>
                    <Typography onClick={()=> navigate("/")} variant="h6" className={ classes.title }>
                        CoinSentinel
                    </Typography>
            
                    <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="INR"
              style={{ width: 100, height: 40, marginLeft: 15,color:"white" }}
              onChange={(e) => setCurrency(e.target.value)}
              >
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