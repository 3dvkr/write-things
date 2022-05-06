import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState("")
  return (
    <div>
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
