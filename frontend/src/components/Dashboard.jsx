import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="container mt-5">
            <h1>Welcome to the Heart Track Dashboard</h1>
            <p>
                Here you can monitor your heart rate and blood oxygen saturation
                levels.
            </p>
            <button className="btn btn-danger" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
