import React from 'react';

export default function Card({ flag, name, continent }) {
  return (
    <div>
      <img src={flag} width="400px" height="250px"></img>
      <h2>{name}</h2>
      <h2>{continent}</h2>
    </div>
  );
}
