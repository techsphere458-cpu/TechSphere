import "../styles/BurgerMenuIcon.css"

export default function BurgerMenuIcon({ active }) {
    return (
        <div className={`burger ${active ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}