const Navbar = () => {
    return (
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl">Customer Dashboard</div>
        <div>
          <button className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  