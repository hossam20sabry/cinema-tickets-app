import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
    return (
        <div className="container d-flex align-items-center justify-content-center flex-column vh-100">
        <h4 className="text-center">Unauthorized | 403</h4>
        <p className="text-center my-3 text-capitalize">if you want to go home please click <Link to={'/home'}>here</Link></p>
    </div>
    );
}

export default Unauthorized;
