import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-20">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;
