import { useState, useEffect } from "react";
import { Grid, Container, Stack, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
      letterSpacing: 6,
    },
  },
  palette: {
    text: {
      primary: `hsl(${color}, 30%, 10%)`,
      secondary: `hsl(${color}, 20%, 45%)`,
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

  const isMobile = useMediaQuery("(max-width:600px)");
  console.log(isMobile);

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
      <Container>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent={{ sm: "space-between", md: "space-around" }}
          alignItems={{xs:"stretch", sm:"stretch"}}
        >
          <Form
            pages={pages}
            isLoggedIn={isLoggedIn}
            warning={warning}
            isMobile={isMobile}
          />
          <Picture
            isLoggedIn={isLoggedIn}
            wordRate={wordRate}
            setWordRate={setWordRate}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
