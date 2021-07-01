import React, { Component } from "react";
import '../components/navBar.style.css';

class NavBar extends Component {

    render() {
        return(
            <>
                <div className="navBar">
                    <div className="navBar__body">
                        <img className="navBar__icon" src={ process.env.PUBLIC_URL +"/img/hero_icon.png"} alt="BlueStack"></img>
                    </div>
                </div>
            </>            
        );
        
    }
}

export default NavBar;