import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>HOME PAGE</h1>
            <Link to="/auth/login">Go to Authentication</Link>
        </div>
    )
}