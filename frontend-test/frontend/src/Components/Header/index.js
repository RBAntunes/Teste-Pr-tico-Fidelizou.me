import React from 'react';
import homeSvg from '../../home.svg';
import './Header.css';

import Button from '../Button/index';

export default function Header () {
    return(
        <React.Fragment>
            <header className="header">
                <nav>
                    <ul>
                        <li>
                            <Button className={'home'} name={<img className={'homeSvg'} src={homeSvg} alt="Home"/>} link={{pathname:'/'}}/>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}