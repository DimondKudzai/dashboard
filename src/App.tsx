import React, { useState, useEffect } from 'react'
import './App.css'
import bgImg from './assets/weather_bg.jpg'

// 1. New type matching JSONPlaceholder
type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: User[]) => setUsers(data)) // typed data for TS safety
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value) // don't trim here - trims while typing
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="loading">
        <center><h1>loading...</h1></center>
      </div>
    )
  }

  if (error) {
    return (
      <div className="loading">
        <center><h3>error: {error}</h3></center>
      </div>
    )
  }

  if (selectedUser) {
    return (
      <div className="home" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="intro_para">
          <h1>User Details</h1>
          <center>
            <img 
              className="main_img" 
              src={`https://i.pravatar.cc/300?u=${selectedUser.id}`} 
              alt={selectedUser.name} 
            />
          </center>
          <h2>{selectedUser.name}</h2>
          <p>Username: <b>@{selectedUser.username}</b></p>
          <p>Email: <span>{selectedUser.email}</span></p>
          <p>User ID: <span>{selectedUser.id}</span></p>
          <button className="submit_butt" onClick={() => setSelectedUser(null)}>Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="home" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="intro_para">
        <h1>Users Dashboard</h1>
        <input 
          placeholder="search" 
          className="userInput" 
          type="search" 
          value={searchQuery} 
          onChange={handleSearch} 
        />
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id} onClick={() => setSelectedUser(user)}>
              <img 
                className="proPic" 
                src={`https://i.pravatar.cc/150?u=${user.id}`} 
                alt={user.name} 
              /><br /> {/* Fixed */}
              <span className="names">{user.name}</span>
              <br /><hr /> {/* Fixed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App