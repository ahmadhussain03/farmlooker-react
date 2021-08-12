const Button = (props) => {
    return (
        <button className="w-full px-2 py-2 font-md rounded-md shadow-lg bg-primary-dark text-gray-50 disabled:opacity-30" {...props}>
            {props.children}
        </button>
    )
}

export default Button