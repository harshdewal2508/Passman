import React from 'react';



const Navbar = () => {
  return (
    <nav className="flex justify-evenly text-white items-center px-4 h-14">
      <div className="logo font-bold text-2xl">
        <span className="text-blue-500">&lt;</span>
        <span className="text-gray-300">Pass</span>
        <span className="text-blue-500">Man/&gt;</span>
      </div>
      <ul>
        <li className="flex gap-4  font-bold">
          <a
            href="https://github.com/harshdewal2508/Passman"
            className="hover:text-blue-300 "
          >
            <i class="fa-brands fa-github"></i> Github
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-dewal/"
            className="hover:text-blue-300"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar