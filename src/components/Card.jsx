import "./Card.css";

export function Card({ name, amount }) {
    return (
        <div className="card">
            <h3 className="card-heading" >{name}</h3>
            <p className="card-amount">{amount}</p>
        </div>
    );
}
