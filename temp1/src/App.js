import React, { useState, useEffect } from 'react';
import './App.css';

// ✅ sampleData moved outside the component
const sampleData = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York', occupation: 'Engineer' },
  { id: 2, name: 'Jane Smith', age: 30, city: 'San Francisco', occupation: 'Designer' },
  { id: 3, name: 'Alice Brown', age: 28, city: 'Chicago', occupation: 'Doctor' },
  { id: 4, name: 'Bob Johnson', age: 35, city: 'New York', occupation: 'Engineer' },
];

function App() {
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    city: '',
    occupation: '',
  });

  const [filteredData, setFilteredData] = useState(sampleData);

  useEffect(() => {
    const filtered = sampleData.filter((item) => {
      return (
        (filters.name === '' || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.age === '' || item.age === parseInt(filters.age)) &&
        (filters.city === '' || item.city === filters.city) &&
        (filters.occupation === '' || item.occupation === filters.occupation)
      );
    });
    setFilteredData(filtered);
  }, [filters]);

  const updateFilters = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      age: '',
      city: '',
      occupation: '',
    });
  };

  return (
    <div className="App">
      <h2>Filterable Table</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => updateFilters('name', e.target.value)}
        />

        <input
          type="number"
          placeholder="Filter by Age"
          value={filters.age}
          onChange={(e) => updateFilters('age', e.target.value)}
        />

        <select value={filters.city} onChange={(e) => updateFilters('city', e.target.value)}>
          <option value="">All Cities</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Chicago">Chicago</option>
        </select>

        <select value={filters.occupation} onChange={(e) => updateFilters('occupation', e.target.value)}>
          <option value="">All Occupations</option>
          <option value="Engineer">Engineer</option>
          <option value="Designer">Designer</option>
          <option value="Doctor">Doctor</option>
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>City</th><th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.city}</td>
                <td>{person.occupation}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No results found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
