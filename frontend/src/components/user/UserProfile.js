import React from 'react';
import './userProfile.css';

const UserProfile = ({user}) => {
  return (
    <div className="userprofile">
      <h1>{user.username}</h1>
      <h2>{user.country}</h2>
      <h2>{user.name}</h2>
      <h2>{user.status}</h2>
      <h2>{user.dateOfJoin}</h2>
    </div>
  )
}

export default UserProfile;