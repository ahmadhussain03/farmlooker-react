import { useEffect } from 'react'
import { connect } from 'react-redux'

import logo from '../../assets/images/logo.png'

import MenuIcon from '../icons/MenuIcon'
import CrossIcon from '../icons/CrossIcon'

import { AnimatePresence } from 'framer-motion'

const Header = ({ isOpen, setClose, setOpen, showSideBarOption = true }) => {

    const handleToggleMenu = (e) => {
        e.preventDefault()

        if(isOpen){
            setClose()
        } else {
            setOpen()
        }
    }

    useEffect(() => {

    }, [isOpen])
    
    return (
        <header className="w-full h-16 px-5 py-2 border-b-2 border-primary-dark bg-gray-100 flex flex-row items-center space-x-5">
            {showSideBarOption && (<button className="cursor-pointer" onClick={(e) => handleToggleMenu(e)}>
                <AnimatePresence exitBeforeEnter initial={false}>
                    {isOpen ? <CrossIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </AnimatePresence>
            </button>)}
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