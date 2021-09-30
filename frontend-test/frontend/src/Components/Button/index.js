import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css'

const Button = ({ className, name, link, method }) =>
    <React.Fragment>
        <button className={ `button ${className}` } onClick={method}>
            { link ? <Link to={link}>{name}</Link> : name }
        </button>
    </React.Fragment>

export default Button