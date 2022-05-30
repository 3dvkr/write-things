import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Link } from "@mui/material";
import Form from "./components/Form";
// const oauth_client_id = ***;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!document.cookie);
  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem("page-list")) || []
  );

  const logOut = () => {
    fetch("http://localhost:4000/logout", {
      method: "DELETE",
      credentials: "include",
    });
  };

  useEffect(() => {
    setPages(JSON.parse(localStorage.getItem("page-list")) || []);
    const params = new URL(window.document.location).searchParams;

    const code = params.get("code");

    if (!code || isLoggedIn) return;
    fetch(`http://localhost:4000/login/${code}`, {
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
    <Paper
      sx={{
        padding: "1rem",
        width: 3 / 4,
        maxWidth: 700,
        margin: "0 auto",
        marginTop: "calc(2.5rem + 2vh)",
      }}
    >
      <Typography variant="h2" component="h1">
        Write Things!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: 'center'
        }}
      >
        <Link
        variant="button"
          href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
        >
          {isLoggedIn && "Re-"}Connect To Notion
        </Link>
        {isLoggedIn && <Button onClick={logOut}>Disconnect from Notion</Button>}
      </Box>
      <Form pages={pages} isLoggedIn={isLoggedIn} />
    </Paper>
  );
}

export default App;
