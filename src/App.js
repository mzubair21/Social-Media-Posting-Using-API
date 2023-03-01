import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, React } from "react";

import { Provider } from "react-redux";
import store from "./store";

const Nav = lazy(() => import("./Components/Nav"));
const Sprout = lazy(() => import("./Components/Pages/Sprout"));
const SocialMedia = lazy(() => import("./Components/Pages/SocialMedia"));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Nav />
            <Routes>
              <Route exact path="/" element={<SocialMedia />} />
              <Route path="/socialmedia" element={<SocialMedia />} />
              <Route path="/sprout" element={<Sprout />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
