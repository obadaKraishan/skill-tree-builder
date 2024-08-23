import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function SkillTree() {
  const [skillTree, setSkillTree] = useState(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/skill-trees/60d21b4667d0d8992e610c85')
        .then(response => {
            setSkillTree(response.data);
            generateFlowElements(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the skill tree!', error);
        });
  }, []);

  const generateFlowElements = (data) => {
    const nodes = [];
    const edges = [];
    let yPosition = 0; // Initialize Y position

    const traverseTree = (node, parent = null, depth = 0) => {
      const nodeId = node._id;
      nodes.push({
        id: nodeId,
        data: { label: node.title },
        position: { x: depth * 200, y: yPosition } // Spread out nodes horizontally and vertically
      });

      yPosition += 100; // Move the next node down

      if (parent) {
        edges.push({
          id: `e${parent._id}-${nodeId}`,
          source: parent._id,
          target: nodeId,
          type: 'smoothstep'
        });
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => traverseTree(child, node, depth + 1));
      }
    };

    traverseTree(data.rootNode);
    
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    setElements([...nodes, ...edges]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Your Skill Tree</h2>
      {skillTree ? (
        <ReactFlowProvider>
          <div style={{ height: '600px', width: '100%', border: '1px solid #ddd' }}>
            <ReactFlow elements={elements} fitView />
          </div>
          <MiniMap />
          <Controls />
        </ReactFlowProvider>
      ) : (
        <p>Loading skill tree...</p>
      )}
    </div>
  );
}

export default SkillTree;
