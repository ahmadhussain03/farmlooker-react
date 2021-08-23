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
import CreateAnimal from './animal/CreateAnimal'
import AllAnimals from './animal/AllAnimals'
import Main from './Dashboard/Main'
import AllVaccineRecord from './vaccine_record/AllVaccineRecord'
import CreateVaccineRecord from './vaccine_record/CreateVaccineRecord'


const Dashboard = ({ user }) => {

    let { path } = useRouteMatch();
    const location = useLocation();

    return (
        <div className="bg-primary-light w-full min-h-screen overflow-hidden">
            <Header></Header>
            <div className="flex md:flex-row flex-col pt-10">
                <div className="md:w-1/5 " style={{minHeight: "calc(100vh - 6.5rem)"}}>
                    <SideBar></SideBar>
                </div>
                <div className="flex-1">
                    <AnimatePresence exitBeforeEnter initial={false}>
                        <Switch location={location} key={location.key}>
                            <FarmRoute exact path={`${path}`} component={Main}></FarmRoute>
                            <AuthRoute exact path={`${path}/create-farm`} component={CreateFarm}></AuthRoute>
                            
                            { user?.farms?.length > 0 &&
                                <>
                                    <FarmRoute path={`${path}/animal`} component={AllAnimals}></FarmRoute>
                                    <FarmRoute path={`${path}/vaccine-record`} component={AllVaccineRecord}></FarmRoute>
                                    <FarmRoute path={`${path}/create-animal`} component={CreateAnimal}></FarmRoute>
                                    <FarmRoute path={`${path}/create-vaccine-record`} component={CreateVaccineRecord}></FarmRoute>
                                </>
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