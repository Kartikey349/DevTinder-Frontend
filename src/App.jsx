import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/store";
import Feed from "./components/Feed";


function App() {
  return (
  <div >
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<div>profile</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </div>
  )
}

export default App;
