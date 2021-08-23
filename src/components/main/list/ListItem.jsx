import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

import Button from '../../auth/form/Button'
import axios from '../../../utils/axios'

const ListItem = ({ data, title, renderItem, deleteEndpoint = '', editEndpoint = '', itemDeleted, itemEdited }) => {

    const [detail, setDetail] = useState(false)
    const [isDeleting, setDeleting] = useState(false)

    const fields = []
    const values = []

    const handleToggleDetail = (e) => {
        e.preventDefault()

        setDetail(detail => !detail)
    }

    Object.entries(data).map(item => {
        let prepareData = renderItem(item[0], item[1])

        if(prepareData){
            fields.push(prepareData[0])
            values.push(prepareData[1])
        }

        return item
    })

    const handleDeleting = async (e) => {
        e.preventDefault()

        setDeleting(true)

        try {
            await axios.delete(`${deleteEndpoint}/${data.id}`)
            itemDeleted(data.id)
            setDeleting(false)

        } catch(e){

            setDeleting(false)
            console.error(e)
        }


    }

    return (
        <div className="bg-white shadow rounded-lg w-full flex flex-col space-y-1 p-2" >
            <div className="w-full text-center bg-primary-900 text-gray-100 font-semibold p-3 rounded-2xl cursor-pointer" onClick={handleToggleDetail}>
                {data[title]}
            </div>
            <AnimatePresence exitBeforeEnter>
                { detail &&
                    <>
                        <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        transition={{duration: 0.5}}
                        className="flex flex-row">
                            <div className="list-none flex flex-col space-y-3 flex-1 bg-primary-100 text-gray-600 px-2 py-1 rounded-lg">
                                {fields && fields.map((field, index) => (
                                    <li key={index}>{field}</li>
                                ))}
                            </div>
                            <div className="list-none font-semibold flex flex-col space-y-3 flex-1 text-gray-600 px-2 py-1 text-right">
                                {values && values.map((value, index) => (
                                    <li key={index}>{value}</li>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                        initial={{y: 50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 50, opacity: 0}}
                        transition={{duration: 0.5}}
                        className="flex flex-row items-center p1-1 space-x-1">
                            <div className="flex-1">
                                <Button disabled={false}>Edit</Button>
                            </div>
                            <div className="flex-1">
                                <Button disabled={isDeleting} onClick={(e) => {
                                    handleDeleting(e)
                                }}>Delete</Button>
                            </div>
                        </motion.div>
                    </>
                }
            </AnimatePresence>
        </div>
    )
}

export default ListItem
