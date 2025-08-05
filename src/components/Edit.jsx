import { useState, useEffect, useRef } from 'react';

export const EditExpense = ({ data, onUpdate, onClose }) => {
    const modalRef = useRef();
    const [title, setTitle] = useState(data.name);
    const [amount, setAmount] = useState(data.amount);
    const [category, setCategory] = useState(data.category);
    const [date, setDate] = useState(data.date);

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedAmount = parseFloat(amount);

        if (!title || !amount || !category || !date) {

            return;
        }
        if (isNaN(parsedAmount) || parsedAmount <= 0) {

            return;
        }


        const updatedExpense = {
            ...data,
            name: title,
            amount: parsedAmount,
            category,
            date,
        };

        onUpdate(updatedExpense);

    };

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


    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>


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
                        onKeyDown={(e) => {
                            if (["e", "E", ".", "-"].includes(e.key)) e.preventDefault();
                        }}
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
