import React from 'react';
import loaderSrc from '../../assets/loader.gif'
import './index.css'

const Loader = props => (
    <div>
        <img className="loader-img"
        src={loaderSrc}
        alt="Loader icon" />
    </div>
)

export default Loader;