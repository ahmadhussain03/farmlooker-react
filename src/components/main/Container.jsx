import React from 'react'

function Container({children, title}) {
    return (
        <div className="flex items-center flex-col px-5 mx-auto space-y-2">
            {title && (
                <div className="mb-8 text-center w-full">
                    <h1 className="pb-3 text-primary text-2xl font-semibold border-b-2 border-primary">{title}</h1>
                </div>
                )
            }
            {children}
        </div>
    )
}

export default Container
