import React from "react"
// import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Pizza from "./Pizza"

export default function Home() {
return (

    <div>
    <nav>
    <Link to ="/" component={Home}></Link>
    <Link to ="/pizza" component={Pizza}></Link>
    </nav>
    </div>

)
}