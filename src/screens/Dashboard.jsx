import {
    Switch,
    useRouteMatch,
    useLocation,
    useHistory
  } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

import { useEffect } from 'react'
import {
    isMobile
  } from "react-device-detect";

import { connect } from 'react-redux'
import AuthRoute from '../components/routes/AuthRoute'
import FarmRoute from '../components/routes/FarmRoute'
import Header from '../components/main/Header'
import SideBar from '../components/main/SideBar'

import CreateFarm from './Farm/CreateFarm'
import CreateAnimal from './animal/CreateAnimal'
import AllAnimals from './animal/AllAnimals'
// import Main from './Dashboard/Main'
import Summary from './Dashboard/Summary'
import AllVaccineRecord from './vaccine_record/AllVaccineRecord'
import CreateVaccineRecord from './vaccine_record/CreateVaccineRecord'
import CreateDiseaseAlert from "./DiseaseAlert/CreateDiseaseAlert";
import AllDiseaseAlert from "./DiseaseAlert/AllDiseaseAlert";
import AllWorkers from "./Workers/AllWorkers";
import CreateWorker from "./Workers/CreateWorker";
import CreateAsset from "./Asset/CreateAsset";
import AllAsset from "./Asset/AllAsset";
import AllTradingAnimal from './TradingAnimal/AllTradingAnimal'
import CreateTradingAnimal from './TradingAnimal/CreateTradingAnimal'
import AllRentalEquipment from "./RentalEquipment/AllRentalEquipment";
import CreateRentalEquipment from "./RentalEquipment/CreateRentalEquipment";
import EditAnimal from './animal/EditAnimal';
import EditVaccineRecord from './vaccine_record/EditVaccineRecord';
import EditWorker from './Workers/EditWorker';
import EditAsset from './Asset/EditAsset';
import EditTradingAnimal from './TradingAnimal/EditTradingAnimal';
import EditRentalEquipment from './RentalEquipment/EditRentalEquipment';
import HomeTradingAnimal from './TradingAnimal/HomeTradingAnimal';
import HomeRentalEquipment from './RentalEquipment/HomeRentalEquipment';
import NewMain from './Dashboard/NewMain';
import AnimalTree from './animal/AnimalTree';
import AllFarms from "./Farm/AllFarms";
import CreateExpense from "./Finance/CreateExpense";
import Finance from "./Finance/Finance";
import CreateIncome from './Finance/CreateIncome';
import EditManager from './Manager/EditManager';
import AllManager from './Manager/AllManager';
import CreateManager from './Manager/CreateManager';
import AllHerds from "./Herd/AllHerds";
import CreateHerd from "./Herd/CreateHerd";
import EditHerd from "./Herd/EditHerd";


const Dashboard = ({ user, isOpen, setClose }) => {

    let { path } = useRouteMatch();
    const location = useLocation();
    const history = useHistory()

    useEffect(() => {
        
        const unlisten = history.listen((loc, action) => {
            if(isMobile){
                setClose()
            }
        })

        return () => {
            unlisten()
        }
    }, [history, setClose])

    return (
        <div className="bg-primary-light w-full h-screen overflow-x-hidden">
            <Header></Header>
            
            <div className="flex md:flex-row flex-col">
                <AnimatePresence exitBeforeEnter>
                {isOpen &&
                        <motion.div 
                        
                        initial={{x: -500, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: -500, opacity: 0}}
                        transition={{duration: 0.3}}
                        
                        className="md:w-1/6 bg-primary-side pt-8 border-none overflow-y-auto" style={{minHeight: "calc(100vh - 4rem)"}}>
                            <SideBar></SideBar>
                        </motion.div>
                }
                </AnimatePresence>
                { ((isMobile && !isOpen) || !isMobile) &&
                    <div className="py-10 flex-auto">
                        <AnimatePresence exitBeforeEnter initial={false}>
                            <Switch location={location} key={location.key}>
                                <FarmRoute exact path={`${path}`} component={NewMain}></FarmRoute>
                                <FarmRoute exact path={`${path}/summary/:type`} component={Summary}></FarmRoute>
                                <AuthRoute exact path={`${path}/create-farm`} component={CreateFarm}></AuthRoute>
                                
                                { user?.farms?.length > 0 &&
                                    <>
                                        <FarmRoute exact path={`${path}/farm`} component={AllFarms}></FarmRoute>
                                        <FarmRoute path={`${path}/animal`} component={AllAnimals}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-animal/:id`} component={EditAnimal}></FarmRoute>
                                        <FarmRoute path={`${path}/tree-animal/:id`} component={AnimalTree}></FarmRoute>
                                        <FarmRoute path={`${path}/herd`} component={AllHerds}></FarmRoute>
                                        <FarmRoute path={`${path}/vaccine-record`} component={AllVaccineRecord}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-vaccine-record/:id`} component={EditVaccineRecord}></FarmRoute>
                                        <FarmRoute path={`${path}/disease-alert`} component={AllDiseaseAlert}></FarmRoute>
                                        <FarmRoute path={`${path}/worker`} component={AllWorkers}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-worker/:id`} component={EditWorker}></FarmRoute>
                                        <FarmRoute path={`${path}/asset`} component={AllAsset}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-asset/:id`} component={EditAsset}></FarmRoute>
                                        <FarmRoute path={`${path}/trading-animal`} component={HomeTradingAnimal}></FarmRoute>
                                        <FarmRoute path={`${path}/my-trading-animal`} component={AllTradingAnimal}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-trading-animal/:id`} component={EditTradingAnimal}></FarmRoute>
                                        <FarmRoute path={`${path}/my-rental-equipment`} component={AllRentalEquipment}></FarmRoute>
                                        <FarmRoute path={`${path}/rental-equipment`} component={HomeRentalEquipment}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-rental-equipment/:id`} component={EditRentalEquipment}></FarmRoute>
                                        <FarmRoute path={`${path}/create-animal`} component={CreateAnimal}></FarmRoute>
                                        <FarmRoute path={`${path}/create-herd`} component={CreateHerd}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-herd/:id`} component={EditHerd}></FarmRoute>
                                        <FarmRoute path={`${path}/create-vaccine-record`} component={CreateVaccineRecord}></FarmRoute>
                                        <FarmRoute path={`${path}/create-disease-alert`} component={CreateDiseaseAlert}></FarmRoute>
                                        <FarmRoute path={`${path}/create-worker`} component={CreateWorker}></FarmRoute>
                                        <FarmRoute path={`${path}/create-manager`} component={CreateManager}></FarmRoute>
                                        <FarmRoute path={`${path}/create-asset`} component={CreateAsset}></FarmRoute>
                                        <FarmRoute path={`${path}/create-trading-animal`} component={CreateTradingAnimal}></FarmRoute>
                                        <FarmRoute path={`${path}/create-rental-equipment`} component={CreateRentalEquipment}></FarmRoute>
                                        <FarmRoute path={`${path}/finance`} component={Finance}></FarmRoute>
                                        <FarmRoute path={`${path}/create-expense`} component={CreateExpense}></FarmRoute>
                                        <FarmRoute path={`${path}/create-income`} component={CreateIncome}></FarmRoute>
                                        <FarmRoute path={`${path}/edit-manager/:id`} component={EditManager}></FarmRoute>
                                        <FarmRoute path={`${path}/manager`} component={AllManager}></FarmRoute>
                                    </>
                                }
                            </Switch>
                        </AnimatePresence>
                    </div>
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setClose: () => dispatch({ type: "SET_CLOSE" })
    };
};

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      isOpen: state.menu.isOpen
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)