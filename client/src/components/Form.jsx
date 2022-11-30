import { useState, useEffect } from "react";

import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const Form = ({ pages, isLoggedIn, warning, isMobile, wordCount, countWords }) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("write-notes")) || ""
  );
  const [pageName, setPageName] = useState("");
  const [memo, setMemo] = useState("");
  const [send, setSend] = useState("");

  const [rows , setRows] = useState(isLoggedIn || isMobile ? 6 : 11);

  useEffect(()=> {
    setRows(isLoggedIn || isMobile ? 6 : 11);
  }, [isLoggedIn, isMobile]);

  useEffect(() => {
    if (send !== "") {
      setTimeout(setSend, 3000, "");
    }
  }, [send]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pageName, notes, memo }),
    }).then((resp) => {
      if (resp.status === 200) {
        setSend("Success!");
      } else {
        setSend("Please try again.");
      }
    });
  };

  return (
    <Paper sx={{
      flexBasis: "50%",
      height: "100%",
      paddingBottom: "1em"
    }}>
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        gap: "1em",
        m: 1
      }}
    >
      {isLoggedIn && (
        <FormControl>
          <InputLabel htmlFor="pageName" sx={{bgcolor: "white"}}>
            Choose where to save your note:
          </InputLabel>
          <Select
            labelId="Where to save your note:"
            name="pageName"
            value={pageName}
            id="pageName"
            onChange={(e) => setPageName(e.target.value)}
          >
            {pages.map((page) => (
              <MenuItem value={page} key={page}>
                {page}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {isLoggedIn && (
        <TextField
          label="Title/Memo"
          name="memo"
          placeholder="Title/Memo"
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          value={memo}
        />
      )}

      <FormControl>
        <TextField
          label="Notes"
          multiline={true}
          rows={rows}
          width="100%"
          variant="outlined"
          name="notes"
          placeholder="Notes"
          value={notes}
          onChange={(e) => {
            localStorage.setItem("write-notes", JSON.stringify(notes));
            setNotes(e.target.value);
            console.log("in text field");
            countWords(e);
          }}
        />
      </FormControl>
      <Box sx={{ display: "flex", gap: "1rem", paddingLeft:"1rem"}}>
        <Typography variant="body1">Word Count: {wordCount}</Typography>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            if (confirm("Are you sure you want to clear your notes?")) {
              localStorage.removeItem("write-notes");
              setNotes("");
            }
          }}
        >
          Clear
        </Button>

        {isLoggedIn && (
          <Button variant="contained" type="submit">
            Send to Notion
          </Button>
        )}
        <Typography
          variant="body2"
          sx={{
            color: send === "Success!" ? "green" : "error",
            fontWeight: "bold",
            textAlign: "center",
            margin: "1rem",
          }}
        >
          {send}
        </Typography>
        {warning && <Typography variant="body1" color="error">{warning}</Typography>}
      </Box>
    </Box>
    </Paper>
  );
};

export default Form;
