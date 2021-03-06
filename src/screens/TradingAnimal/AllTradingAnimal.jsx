import React from 'react'
import { useHistory } from 'react-router-dom'
import ImageGallery from 'react-image-gallery';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'
import TrashIcon from '../../components/icons/TrashIcon';


const Action = ({ item, reload }) => {

    const history = useHistory()

    const handleEdit = () => {
        history.push(`edit-trading-animal/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`trading_animal/${item.id}`)
            reload()
           } catch(e){
            throw new Error(e)
           }
    }

    return (
        <div className="flex flex-row space-x-1 items-center justify-center">
            <a onClick={e => handleDelete()} className='border cursor-pointer rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
            <a onClick={e => handleEdit()} className='border cursor-pointer rounded shadow border-yellow-600 p-1 text-yellow-600 edit'>Edit</a>
        </div>
    )
}

const ImageGalleryModal = ({ item }) => {
    
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const gallery = item.images.map(image => ({
        original: image.image,
        thumbnail: image.image
    }))

    return (
        <>
            <button className="px-3 py-2 tracking-tighter text-white text-xs bg-indigo-600 rounded-md" onClick={onOpenModal}>View Images</button>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="w-full">
                    <ImageGallery lazyLoad={true} thumbnailPosition="right" showPlayButton={false} additionalClass="p-4" items={gallery} />
                </div>
            </Modal>
        </>
    )

}

const columns = [
    {data: 'image', label: 'Image', renderer: (props) => (<ImageGalleryModal {...props} />), orderable: false},
    {data: 'type', label: 'Type'},
    {data: 'price', label: 'Price'},
    {data: 'location', label: 'Location'},
    {data: 'dated', label: 'Dated'},
    {data: 'dob', label: 'DOB'},
    {data: 'phone', label: 'Phone'},
    {   
        label: 'Action', 
        renderer: (props) => ( <Action {...props} /> ), 
        orderable: false
    }
]


const SelectedAction = ({ selectedItems, reload }) => {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {

            setLoading(true)
            const ids = selectedItems.map(item => item.id)
            await axios.post(`trading_animal`, { tradings: ids, "_method": "DELETE" })
            reload()
           } catch(e){
                setLoading(false)
                console.error(e)
           } finally {
               setLoading(false)
           }
    }

    return (
        <>
            <button onClick={e => handleDelete()} disabled={loading} className="cursor-pointer disabled:opacity-50 rounded shadow-md text-sm bg-red-600 px-3 py-2 font-semibold text-white"><span className="flex flex-row justify-center items-center space-x-1"><span> <TrashIcon height={16} width={16} /> </span><span>{!loading ? 'Delete Selected' : 'Deleting...'}</span></span></button>
        </>
    )
}

function AllTradingAnimal() {

    const history = useHistory()

    return (
        <Container title="Trading Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-trading-animal')}>Create Trading Animal</Button>
            </SimpleInput>
            <Datatable2 url="trading_animal" columns={columns} isSelectable={true} SelectedAction={SelectedAction} />
        </Container>
    )
}

export default AllTradingAnimal
