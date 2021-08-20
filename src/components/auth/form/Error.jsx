const Error = ({message}) => {
    return (
        <div className="bg-red-200 border-t border-b border-l border-r border-red-500 rounded-md w-full p-3 text-sm text-red-500">
            {message}
        </div>
    )
}

export default Error