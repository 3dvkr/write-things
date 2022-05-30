import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
  TextField,
} from "@mui/material";

const Form = ({ pages, isLoggedIn }) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("write-notes")) || ""
  );
  const [pageName, setPageName] = useState("");
  const [memo, setMemo] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pageName, notes, memo }),
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
        gap: "1rem",
        maxWidth: "70ch",
        margin: "auto",
        padding: "1rem",
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
          rows={6}
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
      {isLoggedIn && (
        <Button variant="contained" type="submit">
          Send to Notion
        </Button>
      )}
    </Box>
  );
};

export default Form;
