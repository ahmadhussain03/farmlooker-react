import { motion } from 'framer-motion'


const Input = ({ type, value, onChange, placeholder, error, onFocus, onBlur }) => {

    let InputType = type;

    if(type === 'date'){
        onFocus = (e) => {
            e.currentTarget.type = "date";
        }
        onBlur = (e) => {
            e.currentTarget.type = "text";
            e.currentTarget.placeholder = placeholder;
        }

        InputType = 'text'
    }

    return (
        <div className="flex flex-col w-full">
            <input type={InputType} value={value} onFocus={onFocus} onBlur={onBlur} onChange={onChange} placeholder={placeholder} className={`py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none shadow border border-transparent focus:border-primary ${error && error.length > 0 ? 'border-red-500' : ''}`} />
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

export default Input