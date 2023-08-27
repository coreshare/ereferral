import React from "react"
import NHSLogoWhite from "../../Images/NHSLogoWhite.png"
import "./Header.css"

const Header = () => {

    return(
        <div class="header">
            <div><img src={NHSLogoWhite} /></div>
            <div>Clatterbridge Cancer eReferral System</div>
        </div>
    )
}

export default Header