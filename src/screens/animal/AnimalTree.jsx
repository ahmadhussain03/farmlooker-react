import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Tree from 'react-d3-tree';


import axios from '../../utils/axios';

  function getNode(node){
    let nodeData = {name: node.animal_id, children: getChildren(node), attributes: { Type: node.type.type, Breed: node.breed.breed }}

    return nodeData
  }

  function getChildren(node){

    let children = [];

    if(node.male_parent_tree){
        children.push({name: node.male_parent_tree.animal_id, children: getChildren(node.male_parent_tree), attributes: { Type: node.male_parent_tree.type.type, Breed: node.male_parent_tree.breed.breed }})
    }

    if(node.female_parent_tree){
        children.push({name: node.female_parent_tree.animal_id, children: getChildren(node.female_parent_tree), attributes: { Type: node.male_parent_tree.type.type, Breed: node.male_parent_tree.breed.breed }})
    }

    return children
}

const AnimalTree = () => {

    const [tree, setTree] = useState({})

    const { id } = useParams()

    const getTree = useCallback(async () => {
        let response = await axios.get(`animal/${id}/tree`);
        setTree(getNode(response.data.data))
    }, [id])

    useEffect(() => {
        getTree()
    }, [getTree]) 

    return (
        <div className="flex items-center justify-center flex-col w-full h-full p-4">
            <div className="text-2xl text-primary font-bold pb-3">
                <h1>Animal Family Tree</h1>
            </div>
            <div className="w-full bg-green-100 shadow-lg rounded-md p-4" style={{height: 'calc(100vh - 9rem)'}}>
                <Tree 
                data={tree} 
                zoom={1}
                initialDepth={0}
                scaleExtent={{min: 0.5, max: 1}}
                translate={{x: 50, y: 200}}
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                />
            </div>
        </div>
    )
}

export default AnimalTree
