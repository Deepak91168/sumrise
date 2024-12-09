import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenerateSummaries from "./GenerateSummaries";
import CompareSummary from "./CompareSummary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenerateSummaries />} />
        <Route path="/compare" element={<CompareSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
