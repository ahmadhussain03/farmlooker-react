
const AuthContainer = (props) => {
    return (
        <div className="bg-gray-100 relative font-roboto min-h-screen min-w-full">
            <img src={props.backgroundImage} alt="farm background" className="fixed inset-0 w-full h-full object-center object-cover"></img>
            <div className="absolute inset-0 w-full h-full">
                <div className="lg:mx-8 md:mx-auto mx-10 mt-12 flex items-center flex-col p-5 md:max-w-xl ">
                    <div className="pb-5 self-center">
                        <img src={props.logo} alt="logo" className="w-32" />
                    </div>
                    <div className="pb-5 pt-2 px-3">
                        <h1 className="text-primary text-3xl text-center tracking-wider">{props.text}</h1>
                    </div>

                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default AuthContainer