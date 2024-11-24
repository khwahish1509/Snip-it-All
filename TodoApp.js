import React, { useState } from 'react';

const TodoApp = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <button onClick={addItem} style={{ padding: '10px 20px' }}>
        Add
      </button>
      <ul style={{ marginTop: '20px' }}>
        {items.map((item, index) => (
          <li key={index} style={{ margin: '5px 0' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;