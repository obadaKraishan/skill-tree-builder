import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function SkillTree() {
  const [skillTree, setSkillTree] = useState(null);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);      // Added error state

  useEffect(() => {
    axios.get('http://localhost:5001/api/skill-trees/60d21b4667d0d8992e610c85')
      .then(response => {
        setSkillTree(response.data);
        generateFlowElements(response.data);
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch(error => {
        setError('There was an error fetching the skill tree!');
        setLoading(false);  // Stop loading even if there's an error
        console.error(error);
      });
  }, []);

  const generateFlowElements = (data) => {
    const nodes = [];
    const edges = [];

    const traverseTree = (node, parent = null) => {
      const nodeId = node._id;
      nodes.push({
        id: nodeId,
        data: { label: node.title },
        position: { x: Math.random() * 500, y: Math.random() * 500 }
      });

      if (parent) {
        edges.push({
          id: `e${parent._id}-${nodeId}`,
          source: parent._id,
          target: nodeId,
          type: 'smoothstep'
        });
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => traverseTree(child, node));
      }
    };

    traverseTree(data.rootNode);
    setElements([...nodes, ...edges]);
  };

  if (loading) return <p>Loading skill tree...</p>;  // Loading state
  if (error) return <p className="text-red-500">{error}</p>;  // Error state

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Your Skill Tree</h2>
      {skillTree ? (
        <ReactFlowProvider>
          <div style={{ height: 500 }}>
            <ReactFlow elements={elements} />
          </div>
          <MiniMap />
          <Controls />
        </ReactFlowProvider>
      ) : (
        <p>No skill tree data available.</p>
      )}
    </div>
  );
}

export default SkillTree;
