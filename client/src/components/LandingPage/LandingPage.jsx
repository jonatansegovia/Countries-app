import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to Countries App!</h1>
      <Link to="/countries">
        <button>ENTER</button>
        <p>By J0n</p>
      </Link>
    </div>
  );
}
