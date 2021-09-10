import React from 'react'

const RentalCardItem = ({ image, location, name, model, username, dated, rent, phone }) => {

    return (
        <div className="flex bg-gray-100 rounded-xl p-0 shadow-lg overflow-hidden">
            <img className="w-1/3 h-auto rounded-none object-cover object-center" src={image} alt="" width="384" height="512" />
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
                    <p className="text-xs text-gray-600 tracking-widest uppercase">Phone</p>
                    <p className="text-xl font-semibold">
                        {phone}
                    </p>
                </div>

                <figcaption className="font-medium pt-10 flex flex-col space-y-2 w-full">
                    <div className="text-cyan-600">
                    <p className="text-xs text-gray-600 tracking-widest uppercase">Username</p>
                        { username }
                    </div>
                    <div className="text-cyan-600">
                    <p className="text-xs text-gray-600 tracking-widest uppercase">Dated</p>
                        { dated }
                    </div>
                </figcaption>
            </div>
        </div>
    )
}

export default RentalCardItem