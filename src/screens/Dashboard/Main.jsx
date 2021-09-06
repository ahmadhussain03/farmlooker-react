import { useEffect, useCallback, useState } from 'react'
import axios from '../../utils/axios'

const SummaryMainCount = ({ mainText = '', subText = '', isFirst = false }) => {
    return (
        <div className="flex-1 w-full">
            <h2 className={`text-center text-8xl text-primary-200 font-semibold ${ isFirst ? 'border-r-2 border-primary' : '' }`}>{mainText} <span className="text-xl block text-gray-700 font-normal">{subText}</span></h2>
        </div>
    );
}

const Main = () => {

    const [data, setData] = useState({})
    const [animalCount, setAnimalCount] = useState(0)
    const [farmCount, setFarmCount] = useState(0)

    const getSummaryData = useCallback(async () => {
        let response = await axios.get("summary")
        console.log(response.data)
        setData(response.data)
    }, [])

    const getAnimalCount = useCallback(async () => {
        let response = await axios.get("animal")
        setAnimalCount(response.data.data.total)
    }, [])

    const getFarmCount = useCallback(async () => {
        let response = await axios.get("farm")
        setFarmCount(response.data.data.total)
    }, [])


      useEffect(() => {
        getAnimalCount()
        getFarmCount()
        getSummaryData()
      }, []);

    return (
            <div className="max-w-full mx-auto">
                <div className="max-w-2xl flex flex-col justify-center items-center mx-auto">
                    <div className="flex-1 w-full text-center">
                        <h1 className="text-5xl text-primary font-semibold border-b-2 border-primary pb-3 w-full">Summary</h1>
                    </div>
                    <div className="flex flex-row justify-center items-center w-full pt-5">
                        <SummaryMainCount mainText={animalCount} subText="Total Animals" isFirst={true} />
                        <SummaryMainCount mainText={farmCount} subText="Total Farms" />
                    </div>
                    <div className="pt-3">

                    </div>
                </div>
            </div>
    )
}

export default Main