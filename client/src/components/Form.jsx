import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
  TextField,
} from "@mui/material";

const Form = ({ pages }) => {
  const [notes, setNotes] = useState("");
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
        justifyContent: "space-between",
        height: "100%",
        gap: "1rem",
        maxWidth: "70ch",
        margin: "auto",
      }}
    >
      <FormControl>
        <InputLabel htmlFor="pageName">Choose where to save your writing:</InputLabel>
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
      <TextField
        label="Title/Memo"
        name="memo"
        placeholder="Title/Memo"
        onChange={(e) => {
          setMemo(e.target.value);
        }}
        value={memo}
      />
      <label htmlFor="notes">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        type="text"
        id="notes"
      />
      <Button variant="contained" type="submit">
        Send to Notion
      </Button>
    </Box>
  );
};

export default Form;
