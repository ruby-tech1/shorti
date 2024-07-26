import Landing from "./Landing";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        limit={2}
        autoClose={2000}
        closeOnClick
      />
      <Landing />
    </>
  );
};

export default App;
