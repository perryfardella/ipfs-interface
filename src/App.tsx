import React, { useState } from 'react';
import './App.css';




const App = () => {
  const [file, setFile] = useState(null);
  const retrieveFile = (e: any) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
    }
  
    e.preventDefault();  
  }
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" name="data" onChange={retrieveFile} />
        <button type="submit" className="btn">Upload file</button>
      </form>
    </div>
  );
}

export default App;
