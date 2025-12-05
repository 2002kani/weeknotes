import { Routes, Route } from "react-router-dom";
import WeekView from "./pages/weekView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WeekView />} />
    </Routes>
  );
}

export default App;
