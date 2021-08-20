import {
    Switch,
    useRouteMatch,
    useLocation
  } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import { connect } from 'react-redux'
import AuthRoute from '../components/routes/AuthRoute'
import FarmRoute from '../components/routes/FarmRoute'
import Header from '../components/main/Header'
import SideBar from '../components/main/SideBar'

import CreateFarm from './Farm/CreateFarm'
import Main from './Dashboard/Main'


const Dashboard = ({ user }) => {

    let { path } = useRouteMatch();
    const location = useLocation();

    return (
        <div className="bg-primary-light w-full min-h-screen overflow-hidden">
            <Header></Header>
            <div className="flex flex-row pt-10">
                <div className="w-1/5" style={{minHeight: "calc(100vh - 6.5rem)"}}>
                    <SideBar></SideBar>
                </div>
                <div className="flex-1">
                    <AnimatePresence exitBeforeEnter initial={false}>
                        <Switch location={location} key={location.key}>
                            <FarmRoute exact path={`${path}`} component={Main}></FarmRoute>
                            <AuthRoute exact path={`${path}/create-farm`} component={CreateFarm}></AuthRoute>
                            
                            { user?.farms?.length > 0 &&
                                <FarmRoute path={`${path}/animal`} component={CreateFarm}></FarmRoute>
                            }
                        </Switch>
                    </AnimatePresence>
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