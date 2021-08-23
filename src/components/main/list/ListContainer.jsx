import React from 'react'

const ListContainer = ({ children }) => {
    return (
        <div className="w-full shadow-lg flex flex-col space-y-3 items-center pt-3">
           {children}
        </div>
    )
}

export default ListContainer
