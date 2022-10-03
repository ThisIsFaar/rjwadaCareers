const Navbar = () => {
  return (
    <nav className="p-3 bg-white-900 border-b">
      <a href="#" className="flex items-center">
        <div className="container flex flex-col flex-wrap justify-center items-center mx-auto">
          <img
            src="http://www.rjwada.com/static/media/rjwada_logo.d5406ae984211241e3c0dcd39f9de14d.svg"
            className="mr-3 h-6 sm:h-10"
            alt="Flowbite Logo"
          />
          <div className="text-xl font-semibold " style={{ color: '#0d99ff' }}>
            Jobs at Rjwada
          </div>
        </div>
      </a>
    </nav>
  );
};

export default Navbar;
