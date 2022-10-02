const Navbar = () => {
  return (
    <nav className="p-3 bg-white-900">
      <div className="container flex flex-wrap justify-center items-center mx-auto">
        <a href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-10"
            alt="Flowbite Logo"
          />
          <span className="text-xl font-semibold text-blue-400">
            Jobs at Rjwada
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
