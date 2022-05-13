import { useState, useEffect } from 'react'

// const oauth_client_id = ***;
function App() {
  const [notes, setNotes] = useState("")
  const [pages, setPages] = useState([])

  useEffect(() => {
    const params = new URL(window.document.location).searchParams;

    const code = params.get("code");
    console.log({ code });
    if (!code) return;
    fetch(`http://localhost:4000/login/${code}`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then(titles => setPages(titles))
  }, []);

  return (
    <div>
      <a href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}>Connect To Notion</a>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log(notes)
        fetch("http://localhost:4000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            notes
          })
        })
        console.log('submit')
      }}>
        <label htmlFor="notes">Notes</label>
        <textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          type="text" 
          id="notes"  
          />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
