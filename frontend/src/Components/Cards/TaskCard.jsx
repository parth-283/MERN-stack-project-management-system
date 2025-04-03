import React from 'react';
import './taskCard.scss';

export default function TaskCard() {
    return (
        <div className="card">
            <div className="card-image">
                <img src="/static/images/cards/contemplative-reptile.jpg" alt="green iguana" />
            </div>
            <div className="card-content">
                <h5 className="card-title">Lizard</h5>
                <p className="card-description">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica.
                </p>
            </div>
            <div className="card-actions">
                <button className="card-button">Share</button>
            </div>
        </div>
    );
}