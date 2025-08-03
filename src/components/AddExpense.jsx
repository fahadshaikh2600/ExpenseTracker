// src/components/AddExpense.jsx
import { useState } from 'react';


export function AddExpense({ onAdd, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.amount || !formData.category || !formData.date) {
            alert("Please fill in all fields");
            return;
        }
        onAdd(formData);
        setFormData({ name: '', amount: '', category: '', date: '' });
    };

    return (
        <div className="modal-backdrop">
            <div className="expense-modal">
                <div className="expense-heading">

                    <h3>Add Expense</h3>
                    <button type="button" className="expense-close-btn" onClick={onClose}>X</button>

                </div>

                <form onSubmit={handleSubmit}>
                    <label>
                        Expense Name<sup>*</sup>
                        <input
                            name="name"
                            type="text"
                            placeholder="Expense name"
                            value={formData.name}
                            onChange={handleChange}
                        /></label>
                    <label>
                        Date<sup>*</sup>
                        <input
                            className='exp-dcc'
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                        /></label>
                    <label>
                        Category<sup>*</sup>
                        <select
                            className='exp-dcc'
                            name="category"
                            type="text"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}>
                            <option value="All">All Categories</option>
                            <option value="Travel">Travel</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Food & Drinks">Food & Drinks</option>
                            <option value="Health">Health</option>
                        </select></label>

                    <label>
                        Amount<sup>*</sup>
                        <input
                            name="amount"
                            type="number"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                        /></label>






                    <div className="expense-modal-actions">
                        <button type="submit">+ Add Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
