import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./assets/styles/GlobalStyle.js";
import Timeline from "./pages/timeline/TimelinePage.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
