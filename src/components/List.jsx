
export function List({ items, onDelete, onEdit }) {
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
                    {items.map((expense, index) => (
                        <tr key={expense.id}>
                            <td>{index + 1}</td>
                            <td>{expense.name}</td>
                            <td>₹{expense.amount}</td>
                            <td>
                                <button className="edit-btn" onClick={() => onEdit(expense)}>Edit</button>
                                <button className="delete-btn" onClick={() => onDelete(expense.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
