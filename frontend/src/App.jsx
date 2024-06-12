import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import Context from "./context";
import { useSelector } from "react-redux";

// Define the context
export const CartContext = createContext();

function App() {
  const [length, setLength] = useState("");
const{currentUser}=useSelector((state)=>state.user)
  const cartLength = async () => {
    try {
      const {data} = await axios.get(`/api/cart/getcountaddtocart`);
      console.log(data);
      if (data.success) {
        setLength(data.data);
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cartLength();
  }, [currentUser]);

  return (
    <>
      <Context.Provider
        value={{
          length,
          cartLength
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-20">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
