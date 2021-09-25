import { useEffect, useCallback, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from 'axios';

import axios from '../../utils/axios'
import {capitalizeFirstLetter} from '../../utils/helper'
// import graph from '../../assets/images/graph.png'
import LocationIcon from '../../components/icons/LocationIcon';
import ExpenseChart from '../../components/charts/ExpenseChart';


const NewMain = () => {

    
    const [data, setData] = useState([])
    const [vaccinated, setVaccinated] = useState(0)
    const [nonVaccinated, setNonVaccinated] = useState(0)
    const [sick, setSick] = useState(0)
    const [sexData, setSexData] = useState([])
    const [animalCount, setAnimalCount] = useState(0)
    const [farmCount, setFarmCount] = useState(0)
    const [assetsCount, setAssetsCount] = useState(0)
    const [workerCount, setWorkerCount] = useState(0)
    const [rentalEquipmentCount, setRentalEquipmentCount] = useState(0)
    const [liveAdsCount, setLiveAdsCount] = useState(0)
    const [expense, setExpense] = useState(0)
    const [currentDate, setCurrentDate] = useState("")
    const [weather, setWeather] = useState({})

    const summaryRequestSource = useRef(null)
    const farmRequestSource = useRef(null)
    const animalRequestSource = useRef(null)

    const getSummaryData = useCallback(async () => {
        summaryRequestSource.current = axiosInstance.CancelToken.source()

        let response = await axios.get("summary")
        console.log(response.data.data)
        setAssetsCount(response.data.data.assets)
        setRentalEquipmentCount(response.data.data.rental_equipment)
        setWorkerCount(response.data.data.worker)
        setLiveAdsCount(response.data.data.live_ads)
        setData(response.data.data.summary)
        setSexData(response.data.data.health_summary.sex)
        setVaccinated(response.data.data.health_summary.vaccinated)
        setSick(response.data.data.health_summary.sick?.count ?? 0)
    }, [])

    const getAnimalCount = useCallback(async () => {
        animalRequestSource.current = axiosInstance.CancelToken.source()

        let response = await axios.get("animal")
        setAnimalCount(response.data.data.total)
    }, [])

    const getFarmCount = useCallback(async () => {
        farmRequestSource.current = axiosInstance.CancelToken.source()

        let response = await axios.get("farm")
        setFarmCount(response.data.data.total)
    }, [])

    const getExpenseTotal = useCallback(async () => {
        
        let response = await axios.get("home/expense/total")
        setExpense(response.data.data)
    }, [])

    const getWeather = useCallback(async () => {
        let response = await axios.get("weather")
        if(response.data?.cod === 200){
            const data = {
                location: response.data.name + ", " + response.data.sys.country,
                temperature: response.data.main.temp,
                icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            }
            setWeather(data)
        }
    }, [])


      useEffect(() => {
        getAnimalCount()
        getFarmCount()
        getSummaryData()
        getExpenseTotal()
        getWeather()

        return () => {
            summaryRequestSource.current.cancel("Cancelling request")
            farmRequestSource.current.cancel("Cancelling request")
            animalRequestSource.current.cancel("Cancelling request")
        }
      }, []);

      useEffect(() => {
        setNonVaccinated(animalCount - vaccinated)
      }, [vaccinated, animalCount])

      useEffect(() => {
        const date = new Date()

        setCurrentDate(date.toDateString())
      }, [])

    return (
        <div className="max-w-full mx-auto px-5">
            <div className="flex flex-wrap flex-row">
                <div className="lg:w-8/12 w-full px-1 flex flex-col space-y-3">
                    <div className="flex flex-row space-x-3">
                        <div className="flex-1 relative bg-gray-800 p-6 rounded-2xl shadow-md">
                            <div className="absolute h-20 rounded-full w-1 border-yellow-primary border bg-yellow-primary left-0 top-8"></div>
                            <div className="flex flex-col justify-center">
                                <h2 className="flex-1 font-semibold text-left text-gray-100">Total Animals</h2>
                                <div className="p-5 flex justify-center items-center self-center text-8xl font-semibold text-gray-100 h-64 w-64 rounded-full border-green-primary border-12">
                                    {animalCount}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col space-y-3">
                            <div className="flex-1 relative bg-gray-800 p-6 rounded-2xl shadow-md">
                                <div className="absolute h-12 w-1 border-yellow-primary border bg-yellow-primary left-0 top-4 rounded-full"></div>
                                <div className="flex flex-row space-x-2 justify-center items-center">
                                    <div className="flex flex-col justify-center text-gray-100">
                                        <h2 className="flex-1 font-semibold text-left">Total Earning</h2>
                                        <h1 className="text-2xl font-bold pt-6">9.2</h1>
                                        <small className="pt-1">Per/Month</small>
                                    </div>
                                    <div className="self-center flex-1">
                                        <ExpenseChart />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 relative bg-gray-800 p-6 rounded-2xl shadow-md">
                                <div className="absolute h-12 w-1 border-yellow-primary border bg-yellow-primary left-0 top-4 rounded-full"></div>
                                <div className="flex flex-row space-x-2 justify-center items-center">
                                    <div className="flex flex-col justify-center text-gray-100">
                                        <h2 className="flex-1 font-semibold text-left">Total Selling</h2>
                                        <h1 className="text-2xl font-bold pt-6">{expense}</h1>
                                        <small className="pt-1">Per/Month</small>
                                    </div>
                                    <div className="self-center flex-1">
                                        <ExpenseChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {data && data.length > 0 &&
                        <div className="flex-1 p-4">
                            <div className="flex flex-row flex-wrap justify-center items-center">
                                {data.map(d => (
                                    <Link to={`/dashboard/summary/` + d.type} className="flex flex-col px-4 py-2 justify-center items-center" key={d.type}>
                                        <div className="h-28 w-28 font-semibold rounded-full flex items-center justify-center bg-green-primary text-gray-50 text-4xl shadow-lg">
                                            <h3>{d.count}</h3>
                                        </div>
                                        <p className="pt-2 font-semibold">{d.type}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    }
                    <div className="flex-1 p-4 rounded-2xl bg-gray-800 shadow-md text-gray-100">
                        <h2 className="text-xl">Farm Health Summary</h2>
                        <div className="flex flex-row flex-wrap px-4 pt-5">
                            {sexData.map(d => (
                                <div key={d.sex} className="flex flex-1 flex-col p-3 text-center justify-center items-center">
                                    <span className="text-3xl font-bold">{d.count}</span>
                                    <span className="text-green-primary">Total {capitalizeFirstLetter(d.sex)}</span>
                                </div>
                            ))}
                
                            <div className="flex flex-1 flex-col p-3 text-center justify-center items-center">
                                <span className="text-3xl font-bold">{vaccinated}</span>
                                <span className="text-green-primary">Vaccinated</span>
                            </div>
                            <div className="flex flex-1 flex-col p-3 text-center justify-center items-center">
                                <span className="text-3xl font-bold">{nonVaccinated}</span>
                                <span className="text-green-primary">Non Vaccinated</span>
                            </div>
                            <div className="flex flex-1 flex-col p-3 text-center justify-center items-center">
                                <span className="text-3xl font-bold">{sick}</span>
                                <span className="text-green-primary">Sick</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-black-primary shadow-md text-gray-100">
                        <div className="flex flex-row space-x-5 space-y-3">
                            <div className="flex-1 border-r border-gray-100 flex items-center">
                                <h1 className="text-2xl font-bold flex-1 text-center flex flex-col space-y-2">
                                    <span className="font-normal">120,000</span>
                                    Expense Summary
                                </h1>
                            </div>
                            <div className="flex-1 flex flex-col space-y-1 text-custom-primary">
                                <div className="flex justify-between px-2">
                                    Animal Purchase <span>{expense}</span>
                                </div>
                                <div className="flex justify-between px-2">
                                    Feed Purchase <span>30000</span>
                                </div>
                                <div className="flex justify-between px-2">
                                    Salaries <span>30000</span>
                                </div>
                                <div className="flex justify-between px-2">
                                    Miscelleneous <span>30000</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            {/* <img src={graph} className="flex-1" alt="graph" /> */}
                            <ExpenseChart />
                        </div>
                    </div>
                </div>
                <div className="lg:w-4/12 py-2 lg:py-0 w-full px-1 flex flex-col space-y-3">
                    <div className="rounded-2xl p-4 shadow-md bg-purple-600 flex justify-center items-center text-gray-100">
                        <div>{currentDate}</div>
                    </div>
                   {weather?.location &&
                     <div className="flex p-3 overflow-hidden relative flex-col shadow-md rounded-xl bg-blue-400 text-gray-100 text-xl font-semibold">
                         <div className="h-4 text-xs flex flex-row space-x-1">
                            <LocationIcon className="h-4 w-4" /> <span>{weather.location}</span>
                         </div>
                         <div className="flex-1 pt-2">
                            <div className="text-4xl">
                                {weather.temperature} &#176;C
                            </div>
                         </div>
                         <div className="absolute right-0 -bottom-2">
                             <img src={weather.icon} alt="weather icon" />
                         </div>
                    </div>
                   }
                    <div className="flex flex-col rounded-2xl border-gray-800 border-2 p-5 shadow-lg justify-center items-center">
                        <div className="text-2xl font-bold">
                            <h1>Summary</h1>
                        </div>
                        <div className="pt-5 flex flex-col items-start space-y-3">
                            <div className="flex-1 flex flex-row justify-center items-center space-x-2">
                                <div className="h-10 w-12 rounded-md bg-blue-600 text-gray-50 text-center text-xl font-semibold flex justify-center items-center">
                                    { workerCount }
                                </div>
                                <div className="font-semibold">
                                    Total Workers
                                </div>
                            </div>
                            <div className="flex-1 flex flex-row justify-center items-center space-x-2">
                                <div className="h-10 w-12 rounded-md bg-blue-600 text-gray-50 text-center text-xl font-semibold flex justify-center items-center">
                                    { liveAdsCount }
                                </div>
                                <div className="font-semibold">
                                    Live Ads
                                </div>
                            </div>
                            <div className="flex-1 flex flex-row justify-center items-center space-x-2">
                                <div className="h-10 w-12 rounded-md bg-blue-600 text-gray-50 text-center text-xl font-semibold flex justify-center items-center">
                                    { assetsCount }
                                </div>
                                <div className="font-semibold">
                                    Total Assets
                                </div>
                            </div>
                            <div className="flex-1 flex flex-row justify-center items-center space-x-2">
                                <div className="h-10 w-12 rounded-md bg-blue-600 text-gray-50 text-center text-xl font-semibold flex justify-center items-center">
                                    { rentalEquipmentCount }
                                </div>
                                <div className="font-semibold">
                                    Total Rental Equipment
                                </div>
                            </div>
                            <div className="flex-1 flex flex-row justify-center items-center space-x-2">
                                <div className="h-10 w-12 rounded-md bg-blue-600 text-gray-50 text-center text-xl font-semibold flex justify-center items-center">
                                    { farmCount }
                                </div>
                                <div className="font-semibold">
                                    Total Farms
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewMain
