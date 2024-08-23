import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-bold mb-6">Welcome to Skill Tree Builder</h2>
      <p className="text-lg mb-8">Map out and track your learning progress in various skills.</p>
      <Link to="/skill-tree" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        View Your Skill Tree
      </Link>
    </div>
  );
}

export default Home;
