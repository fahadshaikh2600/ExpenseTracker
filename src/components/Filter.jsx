import "./Filters.css";
import { useState } from "react";


export const Filter = ({
    setShowAddExpense,
    setShowAddBudget,
    setFilterCategory,
    setSearchTerm,
}) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setFilterCategory(category);
    };


    return (
        <div className="filter-container">

            <input type="text" placeholder="Search" className="search"
                onChange={(e) => setSearchTerm(e.target.value)}
            />




            <button className={`filter ${selectedCategory === "All" ? "active" : ""}`}
                onClick={() => handleCategoryClick("All")}
            >📁 All Expenses</button>
            <button className={`filter ${selectedCategory === "Food & Drinks" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Food & Drinks")}
            >🍕 Food & Drinks</button>
            <button className={`filter ${selectedCategory === "Groceries" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Groceries")}>🛍️ Groceries</button>
            <button className={`filter ${selectedCategory === "Travel" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Travel")}>🧳 Travel</button>
            <button className={`filter ${selectedCategory === "Health" ? "active" : ""}`}
                onClick={() => handleCategoryClick("Health")}>🏥 Health</button>




            <button className="add-budget-button" onClick={() => setShowAddBudget(true)}> +  Add Budget</button>
            <button className="add-expense-button" onClick={() => setShowAddExpense(true)}> +  Add Expense</button>

        </div>
    );
};
