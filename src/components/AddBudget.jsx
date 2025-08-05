
import { useState, useEffect, useRef } from 'react';

export const AddBudget = ({ onAdd, onClose }) => {

    const modalRef = useRef();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const [amount, setAmount] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedAmount = Number(amount);
        if (!parsedAmount || parsedAmount <= 0 || !Number.isInteger(parsedAmount)) {

            return;
        }

        onAdd(parsedAmount);
        onClose();
    };

    return (
        <div className="btn-modal-overlay">
            <div className="btn-modal" ref={modalRef} >
                <div className="add-btn-heading">


                    <h2>Add Budget</h2>   <button className="close-btn" onClick={onClose}>X</button>


                </div>

                <form onSubmit={handleSubmit}>
                    <label>Amount <sup> *</sup> </label>
                    <div>  <input
                        className="enter-amount-input"
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onKeyDown={(e) => {
                            if (["e", "E", "-", "."].includes(e.key)) e.preventDefault();
                        }}
                        onChange={(e) => {
                            setAmount(e.target.value);

                        }}
                        required
                    /></div>
                    <button type="submit" className="add-btn">+ Add Budget</button>

                </form>

            </div>
        </div>
    );
};
