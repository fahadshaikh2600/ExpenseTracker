
import { useState } from "react";


export const EditExpense = ({ data, onUpdate, onClose }) => {
    const [title, setTitle] = useState(data.title);
    const [amount, setAmount] = useState(data.amount);
    const [category, setCategory] = useState(data.category);
    const [date, setDate] = useState(data.date);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExpense = {
            ...data,
            title,
            amount,
            category,
            date,
        };
        onUpdate(updatedExpense);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="model-heading"> <h3>Edit Expense</h3>
                    <button type="button" className="cancel" onClick={onClose}>X</button></div>

                <form onSubmit={handleSubmit}>
                    <label >Expense Name <sup>*</sup></label>
                    <input
                        type="text"
                        placeholder="Enter Expense"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label >Date <sup>*</sup></label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <label >Category <sup>*</sup></label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="All" >Select Category</option>
                        <option value="Travel">Travel</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Food & Drinks">Food & Drinks</option>
                        <option value="Health">Health</option>
                    </select>
                    <label >Amount<sup>*</sup></label>

                    <input
                        className="amount-input"
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <div className="btn-group">
                        <button type="submit"> + Add Expense</button>

                    </div>
                </form>
            </div>
        </div>
    );
};
