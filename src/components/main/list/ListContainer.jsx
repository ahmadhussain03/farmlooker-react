import React from 'react'

const ListContainer = ({ children }) => {
    return (
        <div className="w-full flex flex-row flex-wrap items-center pt-3">
           {children}
        </div>
    )
}

export default ListContainer
