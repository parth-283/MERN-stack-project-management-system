import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
    const data = {
        totalProjects: 12,
        completedTasks: 85,
        pendingTasks: 15,
        teamMembers: 7,
    };

    const projectList = [
        { id: 1, name: 'Website Redesign', status: 'In Progress' },
        { id: 2, name: 'Mobile App Development', status: 'Completed' },
        { id: 3, name: 'Marketing Campaign', status: 'Pending' },
        { id: 4, name: 'Data Analysis', status: 'In Progress' },
        { id: 5, name: 'Product Launch', status: 'Completed' },
    ];

    return (
        <div className="dashboard-container">
            <main className="dashboard-main">
                <section className="dashboard-stats">
                    <div className="stat-card">
                        <h2>Total Projects</h2>
                        <p>{data.totalProjects}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Completed Tasks</h2>
                        <p>{data.completedTasks}%</p>
                    </div>
                    <div className="stat-card">
                        <h2>Pending Tasks</h2>
                        <p>{data.pendingTasks}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Team Members</h2>
                        <p>{data.teamMembers}</p>
                    </div>
                </section>

                <section className="dashboard-projects">
                    <h2>Recent Projects</h2>
                    <ul className="project-list">
                        {projectList.map((project) => (
                            <li key={project.id} className="project-item">
                                <div className="project-name">{project.name}</div>
                                <div className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                                    {project.status}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="dashboard-activity">
                    <h2>Activity Feed</h2>
                    <div className="activity-item">User A completed task "Design UI"</div>
                    <div className="activity-item">User B assigned task "Develop API" to User C</div>
                    <div className="activity-item">Project "Website Redesign" status changed to "In Progress"</div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;