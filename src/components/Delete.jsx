import { useState, useEffect, useRef } from 'react';


export function Delete({ onCancel, onConfirm }) {


    return (
        <div className="modal-backdrop" >
            <div className="delete-modal" >
                <div className="icon">❕</div>
                <h2>Are you sure</h2>
                <p>You won’t be able to revert this!</p>
                <div className="actions">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="confirm-btn" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}
