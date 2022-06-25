import { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import NotionConnection from "./components/NotionConnection";
import Form from "./components/Form";
import Picture from "./components/Picture";
import NavBar from "./components/NavBar";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!document.cookie);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [warning, setWarning] = useState("");
  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem("page-list")) || []
  );
  const [wordRate, setWordRate] = useState(10);

  const isMobile = useMediaQuery("(max-width:800px)");

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
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "min(75%, 1200px)",
          margin: "max(1rem, calc(5vw)) auto",
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
    </>
  );
}

export default App;
