import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function SkillTree() {
  const [skillTree, setSkillTree] = useState(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/skill-trees/your_user_id')
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
        <p>Loading skill tree...</p>
      )}
    </div>
  );
}

export default SkillTree;
