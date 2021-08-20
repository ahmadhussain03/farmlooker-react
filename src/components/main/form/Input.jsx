import { motion } from 'framer-motion'

const Input = ({ type, value, onChange, placeholder, error }) => {
    return (
        <div className="flex flex-col w-full">
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none shadow border border-transparent focus:border-primary ${error && error.length > 0 ? 'border-red-500' : ''}`} />
            {error && error.length > 0 && 
                <motion.span
                initial={{ scale: 0, originX: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, originX: 0 }}
                transition={{ duration: 5 }}
                className="text-xs text-red-500 pt-1">{error[0]}</motion.span>
            }
        </div>
    )
}

export default Input