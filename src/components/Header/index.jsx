import "./index.css"
// import logo from "../../assets/logo.webp";

const Header = (props) => {
    return (
        <header>
            {/* <img src={logo} alt=""/> */}
            <h1>REF1699</h1>
            <span className="header__option"><a href="https://github.com/LuisRivera1699/REF1699-standard" target="_blank" rel="noreferrer">Documentation</a></span>
        </header>
    );
}

export default Header;