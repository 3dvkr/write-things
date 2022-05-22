import { useState } from "react";

const Form = ({ pages }) => {
  const [notes, setNotes] = useState("");
  const [page, setPage] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(notes);
        fetch("http://localhost:4000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            page,
            notes,
          }),
        });
      }}
    >
      <label htmlFor="page">Page</label>
      <select id="page" value={page} onChange={(e) => setPage(e.target.value)}>
        {pages.map((p, i) => (
          <option key={i}>{p}</option>
        ))}
      </select>
      <label htmlFor="notes">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        type="text"
        id="notes"
      />
      <button>Submit</button>
    </form>
  );
};

export default Form;
