import './App.css'
import {Route, Routes} from "react-router-dom";
import {Wallet} from "./wallets/near-wallet"
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
    
  )
}
export default App
