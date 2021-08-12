import { useHistory } from 'react-router-dom'
import cookie from 'js-cookie'

import axiox from '../utils/axios'
import { connect } from 'react-redux'


const Dashboard = ({setLogout}) => {

    const history = useHistory()

    const handleLogout = async e => {
        e.preventDefault()

        try {
            await axiox.post("/logout")
            cookie.remove("token")
            setLogout()
            history.push('/login')
        } catch(e){
            console.error(e)
        }

    }

    return (
        <div className="bg-gray-100 w-full min-h-screen p-5">
            <div className="mx-auto bg-white max-w-2xl rounded-lg p-5 shadow-lg">
                Welcome to Dashboard
                <button onClick={(e) => handleLogout(e)} className="bg-indigo-500 px-3 block w-min py-2 rounded-md text-gray-100">Logout</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setLogout: (user) => dispatch({ type: "SET_LOGOUT" })
    };
};

export default connect(null, mapDispatchToProps)(Dashboard)