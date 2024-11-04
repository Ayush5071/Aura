const CircularEconomy = () => {
  return (
    <section id = "evolution"className="bg-gradient-to-b from-black to-gray-900 text-yellow-400 py-20 relative overflow-hidden">
      <div className="container mx-auto text-center px-4">
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold mb-8 text-red-600">
          The Stark Transformation: From Waste to Wonder
        </h2>

        {/* Introduction */}
        <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed text-gray-300">
          Witness the evolution from traditional waste disposal to a cutting-edge, sustainable economy. 
          Just as Tony Stark revolutionized technology, we are redefining waste management, transforming scrap into invaluable resources.
        </p>

        {/* Images showcasing transformation */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group">
            <img
              src="/scrap-1.jpeg" 
              alt="Scrap to Valuable Product"
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105"
            />
            <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Turning Scrap into Gold
            </h3>
          </div>
          <div className="relative group">
            <img
              src="/scrap-2.jpeg" 
              alt="Valuable Product Example"
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105"
            />
            <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Innovative Recycling Techniques
            </h3>
          </div>
        </div>

        {/* Methodology */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-600 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h4 className="text-xl font-semibold">Reduce</h4>
            <p>Minimizing waste through innovative recycling practices.</p>
          </div>
          <div className="bg-yellow-600 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h4 className="text-xl font-semibold">Reuse</h4>
            <p>Transforming scrap into new, valuable products.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h4 className="text-xl font-semibold">Recycle</h4>
            <p>Engaging communities in sustainable practices.</p>
          </div>
        </div>

     
      </div>

     
    </section>
  );
};

export default CircularEconomy;
