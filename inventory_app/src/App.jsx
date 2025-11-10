import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu/Menu";
import { useState, useEffect } from "react";
import LoginForm from "./components/loginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
   const userAvailable =  localStorage.getItem("user");
    if(!userAvailable){
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? <Menu /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}

export default App;