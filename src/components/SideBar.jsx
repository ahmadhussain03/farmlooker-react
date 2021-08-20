import { Link, useHistory, useRouteMatch } from "react-router-dom"
import cookie from 'js-cookie'
import { connect } from 'react-redux'

import axiox from '../utils/axios'


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
                <li className="hover:bg-gray-100 hover:text-primary-dark border border-primary-dark transition bg-primary-dark p-0 rounded-md text-gray-100 cursor-pointer flex">
                    <Link to={`${url}/create-farm`} className="flex-1 p-2">Farm</Link>
                </li>
                { user?.farms?.length > 0 &&
                    <li className="hover:bg-primary-dark hover:text-gray-100 transition border border-primary-dark p-0 rounded-md text-primary-dark cursor-pointer flex">
                        <Link to={`${url}/animal`} className="flex-1 p-2">Animal</Link>
                    </li>
                }
                <li className="hover:bg-gray-100 hover:text-red-600 transition border border-red-600 bg-red-600 p-0 rounded-md text-gray-100 cursor-pointer flex">
                    <a onClick={(e) => handleLogout(e)} href="/login" className="flex-1 p-2">Logout</a>
                </li>
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