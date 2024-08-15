import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredTasks from "./Components/FilteredTasks";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilteredTasks type="All" />} />
          <Route path="/All" element={<FilteredTasks type="All" />} />
          <Route path="/Meeting" element={<FilteredTasks type="Meeting" />} />
          <Route path="/General" element={<FilteredTasks type="General" />} />
          <Route path="/Today" element={<FilteredTasks type="Today" />} />
          <Route path="/Tomorrow" element={<FilteredTasks type="Tomorrow" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
