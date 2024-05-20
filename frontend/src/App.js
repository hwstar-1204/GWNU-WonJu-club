import React from "react";
import { Routes } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import TopScreen from "./Header/TopScreen";
import CategoryPage from "./Header/CategoryPage";


function App() {
  return (
    <div>
      <TopScreen />
      <CategoryPage />
      <Routes>{AppRoutes()}</Routes>
    </div>
  );
}

export default App;
