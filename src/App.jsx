import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";


function App() {
  return (
  <div >
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<div>profile</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
