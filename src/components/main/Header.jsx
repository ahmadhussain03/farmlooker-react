import { connect } from 'react-redux'

import logo from '../../assets/images/logo.jpeg'

import MenuIcon from '../icons/MenuIcon'
import CrossIcon from '../icons/CrossIcon'

const Header = ({ isOpen, setClose, setOpen }) => {

    const handleToggleMenu = (e) => {
        e.preventDefault()

        if(isOpen){
            setClose()
        } else {
            setOpen()
        }
    }

    return (
        <header className="w-full h-16 px-5 py-2 border-b-2 border-primary-dark bg-gray-100 flex flex-row items-center space-x-5">
            <a className="cursor-pointer" onClick={(e) => handleToggleMenu(e)}>{isOpen ? <CrossIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}</a>
            <img src={logo} alt="farm background" className="h-full"></img>
        </header>
    );
}

const mapDispatchToProps = dispatch => {
    return {
      setOpen: () => dispatch({ type: "SET_OPEN" }),
      setClose: () => dispatch({ type: "SET_CLOSE" })
    };
};

const mapStateToProps = state => {
    return {
      isOpen: state.menu.isOpen
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)