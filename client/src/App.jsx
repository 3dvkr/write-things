import { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import NotionConnection from "./components/NotionConnection";
import Form from "./components/Form";
import Picture from "./components/Picture";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!document.cookie);
  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem("page-list")) || []
  );

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
        localStorage.setItem("page-list", JSON.stringify(titles));
        setIsLoggedIn(true);
        setPages(titles);
      });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: "min(75%, 1200px)",
        margin: "0 auto",
        marginTop: "calc(1rem + 3vw)",
      }}
    >
      <Grid item xs={12} md={8}>
        <Typography variant="h2" component="h1">
          Write Things!
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <NotionConnection
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Form pages={pages} isLoggedIn={isLoggedIn} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Picture isLoggedIn={isLoggedIn} />
      </Grid>
    </Grid>
  );
}

export default App;
