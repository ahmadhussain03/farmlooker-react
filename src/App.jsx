import backgroundImage from './assets/images/background.png'

const App = () => {
  return (
   <div className="bg-gray-100 relative font-roboto min-h-screen min-w-full">
      <img src={backgroundImage} alt="farm background" className="absolute inset-0 w-full h-full object-cover"></img>
      
   </div>
  );
}

export default App;
