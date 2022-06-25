import { useState, useEffect } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const Form = ({ pages, isLoggedIn, warning, isMobile }) => {
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
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "8px",
        margin: "0 auto",
      }}
    >
      {isLoggedIn && (
        <FormControl>
          <InputLabel htmlFor="pageName">
            Choose where to save your writing:
          </InputLabel>
          <NativeSelect
            label="Where to save your writing:"
            name="pageName"
            value={pageName}
            id="pageName"
            onChange={(e) => setPageName(e.target.value)}
          >
            {pages.map((page) => (
              <option value={page} key={page}>
                {page}
              </option>
            ))}
          </NativeSelect>
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
          }}
        />
      </FormControl>
      <Box sx={{ display: "flex", gap: "1rem" }}>
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
  );
};

export default Form;
