import React from "react";
import Update from "./pages/update/Update";
import { Navigate, Route, Routes } from "react-router-dom";
import Create from "./pages/create/Create";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/update" />} />
        <Route path="/update/" element={<Update />}></Route>
        <Route path="/create/" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
