import React from "react";
import { Routes } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import TopScreen from "./Header/TopScreen";
import CategoryPage from "./Header/CategoryPage";
import './App.css';

function App() {
  return (

    <div className='content'>
      <TopScreen />
      <CategoryPage />
      <div className='content-main'>
        <Routes>{AppRoutes()}</Routes>
      </div>
    </div>
  );
}

export default App;
