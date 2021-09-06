import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Bar } from 'react-chartjs-2' 

import axios from '../../utils/axios';


const DatasetLabel = '# Of Animals'
const PrimaryColor = "#61BC5B";

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const SummaryMainCount = ({ mainText = '', subText = '', isFirst = false }) => {
    return (
        <div className="flex-1 w-full">
            <h2 className={`text-center text-8xl text-primary-200 font-semibold ${ isFirst ? 'border-r-2 border-primary' : '' }`}>{mainText} <span className="text-xl block text-gray-700 font-normal">{subText}</span></h2>
        </div>
    );
}

const Summary = () => {

    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([])
    const [male, setMale] = useState(0)
    const [female, setFemale] = useState(0)
    const {type} = useParams();

    const chartRef = useRef();

    const getSummaryData = useCallback(async () => {
        let response = await axios.get(`summary/${type}`)
        response = response.data.data
        console.log(response)

        let data = [];

        if(response?.disease && response?.disease?.length){
            response.disease.forEach(disease => {
                let diseaseData = { name: capitalizeFirstLetter(disease.disease), count: disease.count }
                data.push(diseaseData)
            })
        }

        if(response?.gender && response?.gender?.length){
            response.gender.forEach(gender => {
                let genderData = { name: capitalizeFirstLetter(gender.sex), count: gender.count }
                data.push(genderData)

                if(gender.sex === 'male'){
                    setMale(gender.count)
                } else if(gender.sex === 'female'){
                    setFemale(gender.count)
                }
            })
        }

        setLabels(data.map(d => d.name))
        setData(data)
    }, [type])

    useEffect(() => {
        getSummaryData()

    }, [getSummaryData])

    const getData = (canvas) => {

        const ctx = canvas.getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 0, 300)
        gradient.addColorStop(0, '#61BC5B')
        gradient.addColorStop(1, '#008C97')


        return {
            labels: labels,
            datasets: [{
                label: DatasetLabel,
                data: data.map(d => d.count),
                borderWidth: 1,
                backgroundColor: gradient
            }]
        }
    }

    return (
        <div className="max-w-full mx-auto ">
            <div className="max-w-full flex flex-col justify-center items-center mx-5 bg-gray-100 rounded-lg shadow-lg p-5 space-y-5">
                <div className="flex-1 w-full text-center">
                    <h1 className="text-5xl text-primary font-semibold border-b-2 border-primary pb-5 w-full">Animal Detail</h1>
                </div>
                <div className="flex flex-row justify-center items-center w-full pt-5">
                    <SummaryMainCount mainText={male} subText="Total Males" isFirst={true} />
                    <SummaryMainCount mainText={female} subText="Total Females" />
                </div>
                <div className="flex justify-center items-center w-full pt-10">
                <Bar 
                    ref={chartRef}
                    width={'100%'}
                    height={300}
                    data={getData}
                    options={{ 
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {  // 'legend' now within object 'plugins {}'
                            legend: {
                              labels: {
                                color: PrimaryColor,
                                font: {
                                  size: 18
                                }
                              },
                              position: 'top'
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    precision: 0,
                                    color: PrimaryColor,
                                    font: {
                                        size: 14
                                    },
                                }, 
                                grid: {
                                    display: false
                                },
                                
                                title: {
                                    display: false
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: PrimaryColor,
                                    font: {
                                        size: 16
                                    },
                                }
                            }
                        }
                    }}
                />
                </div> 
            </div>
        </div>
    )
}

export default Summary
