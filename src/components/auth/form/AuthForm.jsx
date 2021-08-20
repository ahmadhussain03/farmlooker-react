const AuthForm = ({children, onSubmit}) => {
    return (
        <form onSubmit={(e) => onSubmit(e)} className="w-full bg-gray-200 bg-opacity-80 rounded-xl py-5 px-5 md:px-8 flex flex-col space-y-2 backdrop-filter backdrop-blur-lg">
          {children}
        </form>
    );
}

export default AuthForm