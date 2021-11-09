import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./styles.scss";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Routes from "./config/Routes";
import { LoginProvider } from "./context/LoginContext";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Route
          render={(props) => (
            <>
              <Header {...props} />
              <Routes />
              <Footer />
            </>
          )}
        />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
