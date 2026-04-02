import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home/>} />
        
        <Route path="/dashboard" element={<Dashboard/>} />
        
        <Route path="*" element={<NotFound/>} />
      
      </Routes>

    </BrowserRouter>

  );

}

export default App;