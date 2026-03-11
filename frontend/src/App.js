import "./App.css";
import ScheduleEmailForm from "./components/ScheduleEmailForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ScheduleEmailForm />;
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
