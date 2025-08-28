import { useState } from 'react';

export function List({ items, onDelete, onEdit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    if (items.length === 0) {
        return <p className="empty-msg">No expenses added yet.</p>;
    }

    return (
        <div className="list-container">
            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Expense </th>
                        <th>Amount</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((expense, index) => (
                        <tr key={expense.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{expense.name}</td>
                            <td>₹{expense.amount}</td>
                            <td>
                                <button className="edit-btn" onClick={() => onEdit(expense)}> ✏️ Edit</button>
                                <button className="delete-btn" onClick={() => onDelete(expense.id)}> 🗑️ Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="pagination">
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => handlePageClick(idx + 1)}
                        className={currentPage === idx + 1 ? "active" : ""}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}
