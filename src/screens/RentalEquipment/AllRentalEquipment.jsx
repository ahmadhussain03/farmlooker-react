import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ImageGallery from 'react-image-gallery';
import Modal from 'react-responsive-modal';

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'
import TrashIcon from '../../components/icons/TrashIcon';

const Action = ({ item, reload }) => {

    const history = useHistory()

    const handleEdit = () => {
        history.push(`edit-rental-equipment/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`rental_equipment/${item.id}`)
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
                    <ImageGallery lazyLoad={true} useBrowserFullscreen={true} thumbnailPosition="right" showPlayButton={false} additionalClass="p-4" items={gallery} />
                </div>
            </Modal>
        </>
    )

}


const SelectedAction = ({ selectedItems, reload }) => {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {

            setLoading(true)
            const ids = selectedItems.map(item => item.id)
            await axios.post(`rental_equipment`, { equipments: ids, "_method": "DELETE" })
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

const columns = [
    {data: 'image', label: 'Image', renderer: (props) => (<ImageGalleryModal {...props} />), orderable: false},
    {data: 'name', label: 'Name'},
    {data: 'model', label: 'Model'},
    {data: 'rent', label: 'Rent'},
    {data: 'location', label: 'Location'},
    {data: 'dated', label: 'Dated'},
    {data: 'phone', label: 'Phone'},
    {   
        label: 'action', 
        renderer: (props) => (<Action {...props} />), 
        orderable: false
    }
]

function AllRentalEquipment() {

    const history = useHistory()

    return (
        <Container title="Rental Equipments">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-rental-equipment')}>Create Rental Equipment</Button>
            </SimpleInput>
            <Datatable2 url="rental_equipment" columns={columns} isSelectable={true} SelectedAction={SelectedAction} />
        </Container>
    )
}

export default AllRentalEquipment
