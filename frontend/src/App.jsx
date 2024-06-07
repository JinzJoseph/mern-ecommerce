import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
        <ToastContainer 
          position='top-center'
          
        />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-20">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;
