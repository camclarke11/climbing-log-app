import React, { useRef, useState, useEffect, useCallback } from 'react';

const ClimbingGymMap = () => {
  const canvasRef = useRef(null);
  const [climbs, setClimbs] = useState([]);
  const [nodeMakingMode, setNodeMakingMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentClimb, setCurrentClimb] = useState({ id: null, name: '', grade: '', location: '', notes: '', x: 0, y: 0 });
  const [activeClimb, setActiveClimb] = useState(null);

  const nodeRadius = 10; // Customize node radius here

  const handleCanvasMouseMove = useCallback((event) => {
    if (showForm) return; // Do nothing if the form is displayed

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find if the mouse is over a node
    const hoverClimb = climbs.find(climb =>
      Math.sqrt((climb.x - x) ** 2 + (climb.y - y) ** 2) < nodeRadius
    );

    setActiveClimb(hoverClimb || null);
  }, [climbs, showForm, nodeRadius]);

  const handleCanvasClick = (event) => {
    if (!nodeMakingMode && activeClimb) {
      // Edit mode: populate form with active node's data for editing
      setCurrentClimb({ ...activeClimb });
      setShowForm(true);
    } else if (nodeMakingMode) {
      // Node making mode: add a new node
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setCurrentClimb({ ...currentClimb, x, y });
      setShowForm(true);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setCurrentClimb(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if we're updating (id exists) or creating a new climb
    const isUpdating = currentClimb._id;
    const apiUrl = isUpdating ? `http://localhost:3000/climbs/${currentClimb._id}` : 'http://localhost:3000/climbs';
    
    try {
      const response = await fetch(apiUrl, {
        method: isUpdating ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentClimb),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        
        // Update the climbs array depending on whether we're adding or updating
        if (isUpdating) {
          setClimbs(climbs => climbs.map(climb => climb._id === currentClimb._id ? responseData : climb));
        } else {
          setClimbs(climbs => [...climbs, responseData]);
        }
        
        setShowForm(false);
        setCurrentClimb({ _id: null, name: '', grade: '', location: '', notes: '', x: 0, y: 0 });
      } else {
        const error = await response.text();
        throw new Error(`Failed to save the climb: ${error}`);
      }
    } catch (error) {
      console.error('Failed to save the climb:', error);
    }
  };
  

  const toggleNodeMaking = () => {
    setNodeMakingMode(!nodeMakingMode);
  };

  const drawClimbs = useCallback((ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    climbs.forEach(climb => {
      ctx.beginPath();
      ctx.arc(climb.x, climb.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = activeClimb && activeClimb.id === climb.id ? 'blue' : 'red';
      ctx.fill();
      ctx.stroke();
    });
  }, [climbs, activeClimb, nodeRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawClimbs(ctx);
  }, [drawClimbs]);

  return (
    <>
      <div>
        <button onClick={toggleNodeMaking}>
          {nodeMakingMode ? 'Disable Node Making' : 'Enable Node Making'}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        style={{ border: '1px solid black' }}
      />
      {showForm && (
        <form onSubmit={handleSubmit} style={{ position: 'absolute', left: currentClimb.x + 20, top: currentClimb.y }}>
          <label>
            Name:
            <input type="text" name="name" value={currentClimb.name} onChange={handleFormChange} required />
          </label>
          <label>
            Grade:
            <input type="text" name="grade" value={currentClimb.grade} onChange={handleFormChange} required />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={currentClimb.location} onChange={handleFormChange} required />
          </label>
          <label>
            Notes:
            <textarea name="notes" value={currentClimb.notes} onChange={handleFormChange} />
          </label>
          <button type="submit">Save Climb</button>
        </form>
      )}
      {activeClimb && (
        <div style={{ position: 'absolute', left: activeClimb.x + 20, top: activeClimb.y - 50, backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
          <p>Name: {activeClimb.name}</p>
          <p>Grade: {activeClimb.grade}</p>
          <p>Location: {activeClimb.location}</p>
          <p>Notes: {activeClimb.notes}</p>
        </div>
      )}
    </>
  );
};

export default ClimbingGymMap;
