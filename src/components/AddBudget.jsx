
import { useState } from "react";

export const AddBudget = ({ onAdd, onClose }) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && !isNaN(amount)) {
            onAdd(Number(amount));
            onClose();
        }
    };

    return (
        <div className="btn-modal-overlay">
            <div className="btn-modal">
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
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    /></div>
                    <button type="submit" className="add-btn">+ Add Budget</button>

                </form>

            </div>
        </div>
    );
};
