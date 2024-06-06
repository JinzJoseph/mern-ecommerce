import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
    </>
  );
}

export default App;
