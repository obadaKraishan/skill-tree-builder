import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">
          <Link to="/">Skill Tree Builder</Link>
        </h1>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/skill-tree">Skill Tree</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
