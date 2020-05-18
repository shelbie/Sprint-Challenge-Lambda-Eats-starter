import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pizza from "./components/Pizza"

function App() {
  return (
  <Router>
      <div>   
          <nav>  
              <div>
      <Link to="/">Home</Link>
      <Link to="/pizza">Pizza</Link>
      </div> 
      </nav>
      <Route exact path="/" component={Home} />
        <Route exact path="/pizza" component={Pizza} />
      </div>
  </Router>
  )
  }
  export default App;
