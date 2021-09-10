import { useEffect, useCallback, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from 'axios';

import axios from '../../utils/axios'


const SummaryMainCount = ({ mainText = '', subText = '', isFirst = false }) => {
    return (
        <div className="flex-1 w-full">
            <h2 className={`text-center text-8xl text-primary-200 font-semibold ${ isFirst ? 'border-r-2 border-primary' : '' }`}>{mainText} <span className="text-xl block text-gray-700 font-normal">{subText}</span></h2>
        </div>
    );
}

const SummarySubCount = ({ mainText = '', subText = '', isFirst = false }) => {
   return (
    <Link to={`/dashboard/summary/` + subText} className="flex-1 w-full cursor-pointer rounded-lg">
        <span className="flex items-center justify-center">
            <h2 className={`text-center text-3xl text-primary-200 font-semibold border-8 border-primary-200 rounded-full p-5 h-32 w-32 hover:shadow-xl transition-all duration-500`}>{mainText} <span className="text-lg block text-gray-700 font-normal">{subText}</span></h2>
        </span>
    </Link>
   )
}

const Main = () => {

    const [data, setData] = useState([])
    const [animalCount, setAnimalCount] = useState(0)
    const [farmCount, setFarmCount] = useState(0)

    const summaryRequestSource = useRef(null)
    const farmRequestSource = useRef(null)
    const animalRequestSource = useRef(null)

    const getSummaryData = useCallback(async () => {
        summaryRequestSource.current = axiosInstance.CancelToken.source()

        let response = await axios.get("summary")
        setData(response.data.data)
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


      useEffect(() => {
        getAnimalCount()
        getFarmCount()
        getSummaryData()

        return () => {
            summaryRequestSource.current.cancel("Cancelling request")
            farmRequestSource.current.cancel("Cancelling request")
            animalRequestSource.current.cancel("Cancelling request")
        }
      }, [getAnimalCount, getFarmCount, getSummaryData]);

    return (
            <div className="max-w-full mx-auto ">
                <div className="max-w-full flex flex-col justify-center items-center mx-5 bg-gray-100 rounded-lg shadow-lg p-5 space-y-5">
                    <div className="flex-1 w-full text-center">
                        <h1 className="text-5xl text-primary font-semibold border-b-2 border-primary pb-5 w-full">Summary</h1>
                    </div>
                    <div className="flex flex-row justify-center items-center w-full pt-5">
                        <SummaryMainCount mainText={animalCount} subText="Total Animals" isFirst={true} />
                        <SummaryMainCount mainText={farmCount} subText="Total Farms" />
                    </div>
                    { data && data.length > 0 &&
                        <div className="flex flex-row justify-center items-center w-full pt-10">
                            {data.length && data.map((d, index) => (
                                <SummarySubCount mainText={d.count} subText={d.type} key={d.type} isFirst={index === data.length - 1 ? false : true} />
                            ))}
                        </div>
                    }
                </div>
            </div>
    )
}

export default Main