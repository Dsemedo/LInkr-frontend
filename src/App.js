import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./assets/styles/GlobalStyle.js";
import Login from "./pages/SignInPage.js";
import Timeline from "./pages/TimelinePage.js";
import Registration from "./pages/Registration.js"

function App() {

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/" element={<Login />} />
         <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
