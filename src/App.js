import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./assets/styles/GlobalStyle.js";
import Login from "./pages/SignInPage.js";
import Timeline from "./pages/TimelinePage.js";
import Registration from "./pages/Registration.js"
import Hashtag from "./pages/Hashtag.js"
import User from "./pages/User.js"

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/" element={<Login />} />
         <Route path="/registration" element={<Registration />} />
         <Route path="/hashtags/:hashtag" element={<Hashtag />} />
         <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
