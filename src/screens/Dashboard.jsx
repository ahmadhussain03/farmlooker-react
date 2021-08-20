import {
    Switch,
    useRouteMatch
  } from "react-router-dom";

import { connect } from 'react-redux'
import AuthRoute from '../components/AuthRoute'
import FarmRoute from '../components/Auth/FarmRoute'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import CreateFarm from './Farm/CreateFarm'
import Main from './Dashboard/Main'


const Dashboard = ({ user }) => {

    let { path } = useRouteMatch();

    return (
        <div className="bg-primary-light w-full min-h-screen">
            <Header></Header>
            <div className="flex flex-row pt-10">
                <div className="w-1/5" style={{minHeight: "calc(100vh - 6.5rem)"}}>
                    <SideBar></SideBar>
                </div>
                <div className="flex-1">
                    <Switch>
                        <FarmRoute exact path={`${path}`} component={Main}></FarmRoute>
                        <AuthRoute exact path={`${path}/create-farm`} component={CreateFarm}></AuthRoute>
                        
                        { user?.farms?.length > 0 &&
                            <FarmRoute path={`${path}/animal`} component={CreateFarm}></FarmRoute>
                        }
                    </Switch>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps, null)(Dashboard)