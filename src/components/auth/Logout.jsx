import "./Logout.css"


export const Logout = ({ onLogout }) => {
    return (
        <button
            className="logout-btn"
            onClick={onLogout}
        >
            Log Out
        </button>
    );
};