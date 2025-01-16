import React from 'react';
import './Upcoming.css';

function Upcoming() {
    return (
        <div className="dashboard-upcomingContainer">
            <div className="dashboard-upcomingHeader">
                Upcoming
            </div>
            <div className="dashboard-upcomingContent">
                <div className="dashboard-upcomingTasks">
                    <div className="dashboard-task">
                        <h2 className="dashboard-taskDate">September 12, 2024 | 7:30 pm</h2>
                        <h1 className="dashboard-taskName">HR Orientation</h1>
                    </div>
                </div>
                <div className="dashboard-upcomingTasks">
                    <div className="dashboard-task">
                        <h2 className="dashboard-taskDate">September 12, 2024 | 7:30 pm</h2>
                        <h1 className="dashboard-taskName">PAD Meeting</h1>
                    </div>
                </div>
                <div className="dashboard-upcomingTasks">
                    <div className="dashboard-task">
                        <h2 className="dashboard-taskDate">September 12, 2024 | 7:30 pm</h2>
                        <h1 className="dashboard-taskName">PAD Meeting</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upcoming;