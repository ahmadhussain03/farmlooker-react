import React, { useState } from 'react'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const RentalModelItem = ({ image, location, name, model, username, dated, rent, phone }) => {
    return (
        <div className="w-full p-2 flex">
            <div className="flex flex-1 flex-col">
                <img className="w-full h-auto rounded-none object-cover object-center" src={image} alt="" width="384" height="512" />
                <div className="flex flex-col md:flex-row pt-6 p-8 text-left md:space-y-0 space-y-2 flex-1 md:flex-wrap flex-nowrap">
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Name</p>
                        <p className="text-xl font-semibold">
                            {name}
                        </p>
                    </div >
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Model</p>
                        <p className="text-xl font-semibold">
                            {model}
                        </p>
                    </div >
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Location</p>
                        <p className="text-xl font-semibold">
                            {location}
                        </p>
                    </div >
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Rent</p>
                        <p className="text-xl font-semibold">
                            {rent}
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Dated</p>
                        <p className="text-xl font-semibold">
                            {dated}
                        </p>
                    </div>

                    <figcaption className="font-medium pt-10 flex flex-col space-y-2 w-full">
                        <div className="text-cyan-600">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Username</p>
                            { username }
                        </div>
                        <div className="text-cyan-600">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Phone</p>
                            { phone }
                        </div>
                    </figcaption>
                </div>
            </div>
        </div>
    )
}

const RentalCardItem = ({ image, location, name, model, username, dated, rent, phone }) => {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div className="lg:w-1/3 w-full px-4 py-2 flex">
            <div className="flex flex-1 bg-gray-100 rounded-xl p-0 shadow-lg">
                <img className="w-1/3 h-auto rounded-md shadow-lg transform -translate-x-5 -translate-y-2 object-cover object-center" src={image} alt="" width="384" height="512" />
                {/* <img className="w-1/3 h-auto rounded-none object-cover object-center" src={image} alt="" width="384" height="512" /> */}
                <div className="flex flex-col md:flex-row pt-6 p-8 text-left md:space-y-0 space-y-2 flex-1 md:flex-wrap flex-nowrap">
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Name</p>
                        <p className="text-md font-semibold">
                            {name}
                        </p>
                    </div >
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Model</p>
                        <p className="text-md font-semibold">
                            {model}
                        </p>
                    </div >
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Location</p>
                        <p className="text-md font-semibold">
                            {location}
                        </p>
                    </div >
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Rent</p>
                        <p className="text-md font-semibold">
                            {rent}
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full md:pt-4">
                        <p className="text-xs text-gray-600 tracking-widest uppercase">Dated</p>
                        <p className="text-md font-semibold">
                            {dated}
                        </p>
                    </div>

                    <figcaption className="font-medium pt-10 flex flex-col space-y-2 w-full">
                        <div>
                            <button className="px-3 py-2 font-semibold tracking-tighter text-white text-sm bg-indigo-600 rounded-md" onClick={onOpenModal}>Show More</button>
                        </div>
                    </figcaption>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <RentalModelItem 
                     name={name}
                     model={model}
                     location={location}
                     rent={rent}
                     image={image}
                     username={username}
                     dated={dated}
                     phone={phone}
                />
            </Modal>
        </div>
    )
}

export default RentalCardItem
