import {
    Switch,
    useRouteMatch,
    useLocation
  } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

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

const Dashboard = ({ user, isOpen }) => {

    let { path } = useRouteMatch();
    const location = useLocation();

    return (
        <div className="bg-primary-light w-full min-h-screen overflow-hidden">
            <Header></Header>
            <div className="flex md:flex-row flex-col">
                <AnimatePresence exitBeforeEnter>
                {isOpen &&
                        <motion.div 
                    
                        initial={{x: -500, opacity: 0, width: '0'}}
                        animate={{x: 0, opacity: 1, width: '16.666%'}}
                        exit={{x: -500, opacity: 0, width: '0'}}
                        transition={{duration: 0.3}}
                        
                        className="md:w-1/6 bg-gradient-to-r from-primary to-primary-200 pt-10 border-none" style={{minHeight: "calc(100vh - 4rem)"}}>
                            <SideBar></SideBar>
                        </motion.div>
                }
                </AnimatePresence>
                <div className="flex-1 pt-10">
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
      user: state.auth.user,
      isOpen: state.menu.isOpen
    };
};

export default connect(mapStateToProps, null)(Dashboard)