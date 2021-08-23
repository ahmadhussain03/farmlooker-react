import { motion } from 'framer-motion'

const Select = ({ value, onChange, placeholder, error, onFocus, options = [] }) => {
    return (
        <div className="flex flex-col w-full">
            <select value={value} onFocus={onFocus} onChange={onChange} className={`py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none shadow border bg-white border-transparent focus:border-primary ${error && error.length > 0 ? 'border-red-500' : ''}`}>
                {placeholder &&
                    <option>{placeholder}</option>
                }
                {options.map(opt => (
                    <option value={opt.value} key={opt.value}>{opt.text}</option>
                ))}
            </select>
            {error && error.length > 0 && 
                <motion.span
                initial={{ scale: 0, originX: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, originX: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs text-red-500 pt-1">{error[0]}</motion.span>
            }
        </div>
    )
}

export default Select