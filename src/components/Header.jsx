import logo from '../assets/images/logo.jpeg'

const Header = () => {
    return (
        <header className="w-full h-16 px-5 py-2 border-b-2 border-primary-dark bg-gray-100">
            <img src={logo} alt="farm background" className="h-full"></img>
        </header>
    );
}

export default Header