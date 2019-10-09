import React from 'react';
import './Layout.css';

const layout = props => {
    const { children } = props;
    return (<div className='layout'>
        {children}
    </div>)
}
export default layout;