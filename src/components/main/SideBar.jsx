import { Link, useHistory, useRouteMatch } from "react-router-dom"
import cookie from 'js-cookie'
import { connect } from 'react-redux'

import axiox from '../../utils/axios'

const SideBarItem = ({ text, to, danger, children }) => {
    return (
        <li className={`hover:bg-gray-100 ${danger ? 'hover:text-red-600 border-red-600 bg-red-600' : 'hover:text-primary-dark border-primary-dark bg-primary-dark'} border transition p-0 rounded-md text-gray-100 cursor-pointer flex`}>
            { children ? children :
                <Link to={to} className="flex-1 p-2">{text}</Link>
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
                <SideBarItem text="Dashboard" to={url} ></SideBarItem>
                <SideBarItem text="Farm" to={`${url}/create-farm`} ></SideBarItem>
            
                { user?.farms?.length > 0 &&
                    <>
                        <SideBarItem text="Animal" to={`${url}/animal`} ></SideBarItem>
                        <SideBarItem text="Vaccine Record" to={`${url}/vaccine-record`} ></SideBarItem>
                    </>

                }
                <SideBarItem danger>
                    <a onClick={(e) => handleLogout(e)} href="/login" className="flex-1 p-2">Logout</a>
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