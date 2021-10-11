import Error from '../../auth/form/Error'

const FormHeading = ({ children }) => {
    return (
        <div className="mb-8 text-center w-full">
            <h1 className="pb-3 text-primary text-2xl font-semibold border-b-2 border-primary">{children}</h1>
        </div>
    )
}

export const FormGroup = ({children}) => {
    return (
        <div className="mt-2 flex items-center justify-center w-full">
            {children}
        </div>
    )
}

const Form = ({ children, onSubmit, formHeading, errors, isPadded = true }) => {
    return (
        <form onSubmit={onSubmit} className={`flex items-center flex-col ${isPadded ? 'px-5' : 'px-0'} ${isPadded ? 'max-w-3xl' : 'w-full'} mx-auto`}>
            {formHeading && <FormHeading>{formHeading}</FormHeading>}
            {errors && errors.message && 
                (
                    <FormGroup>
                        <Error message={errors.message}></Error>
                    </FormGroup>
                )
            }
            {children}
        </form>
    )
}

export default Form