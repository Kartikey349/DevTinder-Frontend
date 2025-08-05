import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/store";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import ConnectionRequest from "./components/connectionRequest";
import Connections from "./components/Connections";
import Chat from "./components/Chat";


function App() {
  return (
  <div >
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/request" element={<ConnectionRequest />}></Route>
          <Route path="/connection" element={<Connections />}></Route>
          <Route path="/chat/:toUserId" element={<Chat />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </div>
  )
}

export default App;
