import { motion } from 'framer-motion'
import Select from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from '../../../utils/axios';

const styles = {
    container: (styles) => ({...styles, width: '100%', shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'}),
    control: (base, state) => ({
        ...base,
        border: 'none',
        padding: '0.5rem 0.25rem',
        boxShadow: 'none',
        ':focus-within': {
            border: '1px solid #61BC5B',
        },
        color: '#61BC5B'
    }),

}

const Select2 = ({ value, onChange, placeholder, error, onFocus, options = [], async = false, url = '', params = {}, mapOptions = (val) => val  }) => {

    const loadOptions =  async (search, loadedOptions, { page }) => {

        console.log(url)

        const response = await axios.get(url, {
            params: { search: search, page: page, ...params }
        });
      
        return {
          options: mapOptions(response.data.data.data),
          hasMore: response.data.data.data.next_page_url ? true : false,
          additional: {
            page: page + 1,
          },
        };
    }

    return (
        <div className="flex flex-col w-full">
            {async ? 
                    <AsyncPaginate
                        value={value}
                        loadOptions={loadOptions}
                        onChange={onChange}
                        additional={{
                            page: 1,
                        }}
                        debounceTimeout={300}
                        placeholder={placeholder}
                        noOptionsMessage={() => "No Record Found!"}
                        styles={styles}
                        cacheUniqs={[url, params]}
                    />
                :
                <Select 
                    defaultValue={value}
                    options={options.map(opt => ({ value: opt.value, label: opt.text }))}
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    styles={styles}
                />
            }
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

export default Select2