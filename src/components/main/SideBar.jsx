import { Link, useHistory, useRouteMatch } from "react-router-dom"
import cookie from 'js-cookie'
import { connect } from 'react-redux'

import axiox from '../../utils/axios'

import HomeIcon from "../icons/HomeIcon"
import FarmIcon from "../icons/FarmIcon"
import AnimalIcon from "../icons/AnimalIcon"
import HelpIcon from "../icons/HelpIcon"
import CartIcon from "../icons/CartIcon"
import WorkerIcon from '../icons/WorkerIcon'
import AlertIcon from '../icons/AlertIcon'
import AssetIcon from '../icons/AssetIcon'

const SideBarItem = ({ text, to, danger, children, icon = null }) => {
    return (
        <li className={`border-b transition p-0 text-gray-100 cursor-pointer flex pb-2`}>
            { children ? children :
              <Link to={to} className="flex flex-row space-x-5 items-center justify-left flex-1 p-2">{icon ? <span>{icon}</span> : null}<span>{text}</span></Link>
            }
        </li>
    )
}


const SideBar = ({ setLogout, user }) => {

    const history = useHistory()

    let { url } = useRouteMatch();

    const handleLogout = async e => {
        e.preventDefault()

        try {
            await axiox.post("/logout")
        } catch(e){
            console.error(e)
        } finally {
            cookie.remove("token")
            setLogout()
            history.push('/login')
        }
    }

    return (
        <nav className="px-2 text-md font-semibold mx-auto text-center">
            <ul className="flex flex-col space-y-2">
                <SideBarItem icon={<HomeIcon className="h-8 w-8" />} text="Dashboard" to={url} ></SideBarItem>
                {user?.farms?.length === 0 &&
                    <>
                        <SideBarItem icon={<FarmIcon className="h-8 w-8" />} text="Farm" to={`${url}/create-farm`} ></SideBarItem>
                    </>
                }
            
                { user?.farms?.length > 0 &&
                    <>
                        <SideBarItem icon={<FarmIcon className="h-8 w-8" />} text="Farm" to={`${url}/farm`} ></SideBarItem>
                        <SideBarItem icon={<AnimalIcon className="h-8 w-8" />} text="Animal" to={`${url}/animal`} ></SideBarItem>
                        <SideBarItem icon={<CartIcon className="h-8 w-8" />} text="Vaccine Record" to={`${url}/vaccine-record`} ></SideBarItem>
                        <SideBarItem icon={<AlertIcon className="h-8 w-8" />} text="Disease Alert" to={`${url}/disease-alert`} ></SideBarItem>
                        <SideBarItem icon={<WorkerIcon className="h-8 w-8" />} text="Worker" to={`${url}/worker`} ></SideBarItem>
                        <SideBarItem icon={<AssetIcon className="h-8 w-8" />} text="Asset" to={`${url}/asset`} ></SideBarItem>
                        <SideBarItem icon={<AnimalIcon className="h-8 w-8" />} text="Trading Animal" to={`${url}/trading-animal`} ></SideBarItem>
                        <SideBarItem icon={<CartIcon className="h-8 w-8" />} text="Rental Equipment" to={`${url}/rental-equipment`} ></SideBarItem>
                    </>

                }
                <SideBarItem>
                    <a onClick={(e) => handleLogout(e)} href="/logout" className="flex flex-row space-x-5 items-center justify-left flex-1 p-2"><span><HelpIcon className="h-8 w-8" /></span> <span>Logout</span></a>
                </SideBarItem>
            </ul>
        </nav>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setLogout: (user) => dispatch({ type: "SET_LOGOUT" })
    };
};

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)