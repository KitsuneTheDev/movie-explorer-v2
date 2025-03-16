import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./pages/Search.jsx";
import Favorites from "./pages/Favorites.jsx";
import { AppProvider } from "./context/AppContext.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
      <AppProvider>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Routes>
          </AppProvider>
      </BrowserRouter>
    </>
  )
}

export default App
