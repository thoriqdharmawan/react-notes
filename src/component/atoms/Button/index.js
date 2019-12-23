import React from 'react';

const Button = ({title, onClick, loading}) => {
    if(loading) {
        return <button className="btn disable">Loading...</button>
    }

    return (
        <button onClick={onClick} className="btn">{title}</button>
    )
}

export default Button;