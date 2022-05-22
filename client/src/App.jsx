import { useState, useEffect } from 'react'
import Form from "./components/Form"
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
      <Form pages={pages}/>
    </div>
  )
}

export default App
