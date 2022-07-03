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

  const [imgSrc, setImgSrc] = useState("https://picsum.photos/300");
  const [changeImg, setChangeImg] = useState(false);

  const [warning, setWarning] = useState("");
  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem("page-list")) || []
  );
  const [wordRate, setWordRate] = useState(10);
  let [wordCount, setWordCount] = useState(0);

  const isMobile = useMediaQuery("(max-width:600px)");

  const getNewImage = async () => {
    let data = await fetch('https://picsum.photos/300');
    let url = await data.url;
    console.log(url);
    setImgSrc(url);
  }
  
  function countWords({ target }) {
    let num = target.value.split(/\s+|\n+/g).filter(el => el.length > 0);
    setWordCount(num.length);
    
    if (wordCount % wordRate === 0 && wordCount > 0) {
      if (!changeImg) {
        getNewImage();
        setChangeImg(true)
      }
    } else {
      setChangeImg(false);
    }
  }

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
          alignItems={{xs:"stretch"}}
        >
          <Form
            pages={pages}
            isLoggedIn={isLoggedIn}
            warning={warning}
            isMobile={isMobile}
            countWords={countWords}
            wordCount={wordCount}
          />
          <Picture
            isLoggedIn={isLoggedIn}
            wordRate={wordRate}
            setWordRate={setWordRate}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
