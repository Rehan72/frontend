import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Toast from "./components/Toster";
import { ThemeProvider } from "./context/Theme-Provider";
import Master from "./router/Master";
import { store } from "./store";

function App() {
 

  return (
    <>
     <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <Master />
        <Toast reverseOrder={false} />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop />
      </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
