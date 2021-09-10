import React from 'react'

const ListContainer = ({ children }) => {
    return (
        <div className="w-full flex flex-col space-y-5 items-center pt-3">
           {children}
        </div>
    )
}

export default ListContainer
