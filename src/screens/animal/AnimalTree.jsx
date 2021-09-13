import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from '../../utils/axios';

const AnimalTree = () => {

    const [tree, setTree] = useState([])

    const { id } = useParams()

    const getTree = useCallback(async () => {
        let response = await axios.get(`animal/${id}/tree`);

        console.log(response.data.data)

        setTree(response.data.data)
    }, [id])

    useEffect(() => {
        getTree()
    }, [getTree])

    return (
        <div>
            Animal Tree
        </div>
    )
}

export default AnimalTree
