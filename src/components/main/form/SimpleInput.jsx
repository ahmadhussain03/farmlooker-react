import React from 'react'

import SearchIcon from '../../../components/icons/SearchIcon'


const SimpleInput = ({value, onChange, icon, placeholder = "", children}) => {
    return (
        <div className="w-full flex flex-row items-center justify-center space-x-2">
            <div className="flex-1 relative">
                <input type="text" onChange={onChange} value={value} placeholder={placeholder} className="py-3 px-8 text-xl rounded-3xl w-full placeholder-primary-dark outline-none shadow" />
                {icon && 
                    <div className="absolute right-4 top-4">
                        <SearchIcon className="h-6 w-6" />
                    </div>
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default SimpleInput
