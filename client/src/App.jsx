import { useState, useEffect } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Form from "./components/Form";
import Picture from "./components/Picture";
import NavBar from "./components/NavBar";

import "./App.css";
const color = 210;
const theme = createTheme({
  typography: {
    fontFamily: "monospace",
    h4: {
      fontFamily: "'Playball', sans-serif",
      letterSpacing: 6
    },
  },
  palette: {
    text: {
      primary: `hsl(${color}, 30%, 10%)`,
      secondary: `hsl(${color}, 20%, 45%)`
    },
    primary: {
      main: `hsl(${color}, 30%, 35%)`,
    },
    secondary: {
      main: `hsl(${color}, 20%, 25%)`, 
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!document.cookie);
  const [warning, setWarning] = useState("");
  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem("page-list")) || []
  );
  const [wordRate, setWordRate] = useState(10);

  const isMobile = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    setPages(JSON.parse(localStorage.getItem("page-list")) || []);
    const params = new URL(window.document.location).searchParams;
    const code = params.get("code");

    if (!code || isLoggedIn) return;
    fetch(`/api/login/${code}`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((titles) => {
        if (titles.length == 0) {
          setWarning(
            "Please try connecting again, and remember to select your page(s)."
          );
          return;
        } else {
          setWarning("");
        }
        localStorage.setItem("page-list", JSON.stringify(titles));
        setIsLoggedIn(true);
        setPages(titles);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "min(75%, 1200px)",
          margin: "max(1rem, 3vw) auto",
        }}
      >
        <Grid item xs={12} md={6}>
          <Form
            pages={pages}
            isLoggedIn={isLoggedIn}
            warning={warning}
            isMobile={isMobile}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Picture
            isLoggedIn={isLoggedIn}
            wordRate={wordRate}
            setWordRate={setWordRate}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
