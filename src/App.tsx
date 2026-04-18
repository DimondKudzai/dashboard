import { useState, useEffect } from 'react'
import './App.css'
import bgImg from './assets/weather_bg.jpg'


function App() {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    // reqres.in now requires a header. Use free key or any string works
    fetch('https://reqres.in/api/users', {
      headers: { 'x-api-key': 'reqres-free-v1' }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => setUsers(data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.trim())
  }

  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <img className="main_img" src={selectedUser.avatar} alt={selectedUser.first_name} />
          </center>
          <h2><span>{selectedUser.first_name}</span> <span>{selectedUser.last_name}</span></h2>
          <p>Email: {selectedUser.email}</p>
          <p>User ID: {selectedUser.id}</p>
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
              <img className="proPic" src={user.avatar} alt={user.first_name} />
              <span className="names">{user.first_name} {user.last_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App