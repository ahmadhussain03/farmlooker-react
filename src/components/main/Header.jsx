import { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import { Link, useRouteMatch } from "react-router-dom"

import axios from '../../utils/axios'

import logo from '../../assets/images/logo.png'

import MenuIcon from '../icons/MenuIcon'
import CrossIcon from '../icons/CrossIcon'

import { AnimatePresence } from 'framer-motion'
import { useHistory } from 'react-router-dom'

const Profile = ({ user, setLogout }) => {

    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null);
    const history = useHistory()
    let { url } = useRouteMatch();

    const handleLogout = async e => {
        e.preventDefault()

        try {
            await axios.post("/logout")
        } catch(e){
            console.error(e)
        } finally {
            cookie.remove("token")
            setLogout()
            history.push('/login')
        }
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
         function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && isOpen === true) {
                setIsOpen(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [wrapperRef, isOpen])

    console.log(user)

    return (
        <div ref={wrapperRef} className="ml-3 relative">
            <div onClick={e => setIsOpen(!isOpen)} className="flex flex-row items-center space-x-2 font-semibold text-sm tracking-wide cursor-pointer">
                <span className="">{user.fullName}</span>
                <button type="button" className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full object-cover object-center" src={user.image} alt="" />
                </button>
            </div>
            <div className={isOpen ? `origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-primary ring-opacity-5 focus:outline-none z-10` : `hidden`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

                <Link to={`${url}/profile`} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Profile</Link>

                <Link to={`${url}/profile`} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>

                <button onClick={(e) => handleLogout(e)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
            </div>
        </div>
    )
}

const Header = ({ isOpen, setClose, setOpen, user, setLogout }) => {

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
            <button className="cursor-pointer" onClick={(e) => handleToggleMenu(e)}>
                <AnimatePresence exitBeforeEnter initial={false}>
                    {isOpen ? <CrossIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </AnimatePresence>
            </button>
            <img src={logo} alt="farm background" className="h-full"></img>
            {user && 
                <div className="flex-1 flex flex-row items-center justify-end">
                    <Profile user={user} setLogout={setLogout} />
                </div>
            }
        </header>
    );
}

const mapDispatchToProps = dispatch => {
    return {
      setOpen: () => dispatch({ type: "SET_OPEN" }),
      setClose: () => dispatch({ type: "SET_CLOSE" }),
      setLogout: (user) => dispatch({ type: "SET_LOGOUT" })
    };
};

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      isOpen: state.menu.isOpen
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)