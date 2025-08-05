import { useState, useEffect, useRef } from 'react';


export function AddExpense({ onAdd, onClose }) {
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
        const { name, amount, category, date } = formData;

        if (!name || !amount || !category || !date) {

            return;
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {

            return;
        }


        onAdd({ ...formData, amount: parsedAmount });
        setFormData({ name: '', amount: '', category: '', date: '' });
    };

    return (
        <div className="modal-backdrop">
            <div className="expense-modal" ref={modalRef}>
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
                            required
                        /></label>
                    <label>
                        Date<sup>*</sup>
                        <input
                            required
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
                            required
                            name="amount"
                            type="number"
                            placeholder="Amount"
                            value={formData.amount}
                            onKeyDown={(e) => {
                                if (["e", "E", "-"].includes(e.key)) e.preventDefault();
                            }}
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
