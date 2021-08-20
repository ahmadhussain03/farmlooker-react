import PropTypes from 'prop-types';

const InputField = ({ labelText, inputType, onChange, value, placeholder, error }) => {
    return (
        <div className="flex flex-col content-start space-y-0">
            <label htmlFor="name">{labelText}</label>
            <input value={value} onChange={(e) => onChange(e)} type={inputType} placeholder={placeholder} className={`rounded-md p-2 border-l border-r border-t border-b focus:border-primary outline-none transition ${error && error.length > 0 ? 'border-red-500' : 'border-gray-800'}`} />
            {error && error.length > 0 && 
                <span className="text-xs text-red-500 pt-1">{error[0]}</span>
            }
        </div> 
    );
}


InputField.propTypes = {
    labelText: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.array
}

export default InputField