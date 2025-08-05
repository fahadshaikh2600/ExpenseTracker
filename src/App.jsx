
import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/Card';
import { Filter } from './components/Filter';
import { List } from './components/List';
import { AddExpense } from './components/AddExpense';
import { EditExpense } from './components/Edit';
import { Charts } from './components/Charts';
import { AddBudget } from './components/AddBudget';
import { Delete } from './components/Delete';


function App() {
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : 0;
  });

  const [expenseItem, setExpenseItem] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [editData, setEditData] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExpenses = expenseItem.filter((e) => {
    const matchCategory = filterCategory === "All" || e.category === filterCategory;
    const matchDate = !filterDate || e.date === filterDate;
    const matchSearch = !searchTerm || e.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchDate && matchSearch;
  });


  const totalExpense = expenseItem.reduce((total, e) => total + Number(e.amount), 0);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
    localStorage.setItem("expenses", JSON.stringify(expenseItem));
  }, [budget, expenseItem]);

  const handleAddExpense = (expense) => {
    const updated = [...expenseItem, { ...expense, id: Date.now() }];
    setExpenseItem(updated);
    setShowAddExpense(false);
  };

  const handleEditExpense = (updatedExpense) => {
    const updatedList = expenseItem.map((item) =>
      item.id === updatedExpense.id ? updatedExpense : item
    );
    setExpenseItem(updatedList);
    setEditData(null);
  };

  const handleAddBudget = (amount) => {
    setBudget(amount);
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id);
  };

  const confirmDelete = () => {
    setExpenseItem(expenseItem.filter((item) => item.id !== deleteTargetId));
    setDeleteTargetId(null);
  };


  return (
    <>
      <h2 className="heading">Expense Tracker</h2>
      <hr />
      <h1 className="greeting">Hello, Fahad</h1>
      <div className="card-container">
        <Card name="Total Budget" amount={`₹${budget}`} />
        <Card name="Total Expense" amount={`₹${totalExpense}`} />
        <Card name="Remaining Budget" amount={`₹${budget - totalExpense}`} />
      </div>

      <Filter
        setShowAddExpense={setShowAddExpense}
        setShowAddBudget={setShowAddBudget}
        setFilterCategory={setFilterCategory}
        setFilterDate={setFilterDate}
        setSearchTerm={setSearchTerm}
      />
      {showAddBudget && (
        <AddBudget onAdd={handleAddBudget} onClose={() => setShowAddBudget(null)} />
      )}


      {showAddExpense && (
        <AddExpense onAdd={handleAddExpense} onClose={() => setShowAddExpense(false)} />
      )}

      {editData && (
        <EditExpense
          data={editData}
          onUpdate={handleEditExpense}
          onClose={() => setEditData(null)}
        />
      )}
      <div className="charts-conatiner">
        <Charts data={filteredExpenses} />

      </div>
      <List
        items={filteredExpenses}
        onDelete={handleDelete}
        onEdit={setEditData}
      />
      {deleteTargetId !== null && (
        <Delete
          onCancel={() => setDeleteTargetId(null)}
          onConfirm={confirmDelete}
        />
      )}


    </>
  );
}

export default App;
