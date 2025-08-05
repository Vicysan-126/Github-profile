import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!username.trim()) return;

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  return (
    <div className="container">
      <h1>🔍 GitHub Profile Finder</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchUser}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="profile">
          <img src={userData.avatar_url} alt="Avatar" />
          <h2>{userData.name || 'No name provided'}</h2>
          <p className="username">@{userData.login}</p>
          <p>{userData.bio}</p>
          <p>📍 {userData.location || 'No location'}</p>
          <p>
            👥 {userData.followers} followers | {userData.following} following
          </p>
          <a href={userData.html_url} target="_blank" rel="noreferrer">
            Visit Profile →
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
