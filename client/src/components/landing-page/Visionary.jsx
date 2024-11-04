const Visionary = () => {
    return (
      <div data-scroll-section id="vision" className="bg-gradient-to-b from-black to-gray-800 text-yellow-400 py-20 relative overflow-hidden">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 animate-pulse">
            The Visionary Behind the Revolution
          </h2>

         
          <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed text-yellow-300 drop-shadow-md">
            Inspired by the ingenuity of <span className="font-bold text-red-500">Tony Stark</span>, our project embodies a commitment to efficiency and innovation in scrap recycling.
            Just as Stark transformed technology to serve humanity, we leverage cutting-edge techniques to turn waste into valuable resources.
            Our mission is to revolutionize the recycling process, making it more sustainable and accessible for everyone, paving the way 
            for a <span className="text-blue-400 font-semibold">greener future</span>.
          </p>
  
          <div className="mt-10 flex justify-center">
            <img
              src="/visionary.jpeg"
              alt="Evolution of Scrap Recycling"
              className="w-full md:w-2/3 object-contain rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 200 200" className="absolute left-0 top-0 transform -translate-x-32 -translate-y-32">
              <circle cx="100" cy="100" r="80" fill="#ff4747" />
            </svg>
            <svg viewBox="0 0 200 200" className="absolute right-0 bottom-0 transform translate-x-32 translate-y-32">
              <circle cx="100" cy="100" r="80" fill="#ffdd00" />
            </svg>
          </div>
        </div>
  
        {/* Iron Man Arc Reactor Effect */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-40 h-40 bg-blue-500 rounded-full opacity-30 animate-pulse" />
        </div>
      </div>
    );
};

export default Visionary;
