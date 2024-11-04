import Enter from "./Enter.jsx";
import Navbar from "./Navbar.jsx";


const Hero = () => {

  const handleLoginClick = () =>{
    //Redirect to login page
  }
  const handleSignUpClick = () =>{
    //Redirect to sign up page
  }
  return (
    <>
      <div className="bg-[url('/landing-page/th.jpeg')] relative  w-full bg-cover h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> 

       {/**NAVBAR */}
       <Navbar/>
       <div className="relative text-center mt-6 mb-6 flex flex-col items-center text-white py-20">
       <h2 className="text-5xl font-bold text-red-600 drop-shadow-lg animate-pulse">Join the Revolution</h2>
       <p className="mt-4 text-xl max-w-2xl mx-auto leading-relaxed text-gray-300">
        Inspired by the innovative genius of Tony Stark, we are on a mission to revolutionize waste management. 
        Just as Iron Man transformed the world with advanced technology, we aim to empower you to turn scrap into valuable resources, 
        pioneering a sustainable future. 
        <span className="font-semibold text-yellow-400"> Discover how you can be a hero in this monumental shift!</span>
    </p>
    <div className ='flex  gap-4 '>
    <Enter text='Join the Stark Initiative ' icon='🤖' onClick={handleSignUpClick}/>
    <Enter text='Join the Sustainability Squad' icon = '🌍'onClick={handleLoginClick}/>
    </div>
</div>

  
      </div>

    </>
  )
}

export default Hero; 