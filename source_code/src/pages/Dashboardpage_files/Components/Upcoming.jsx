import React from "react";
import "./Upcoming.css";

function Upcoming({ posts }) {
  return (
    <div className="dashboard-upcomingContainer">
      <div className="dashboard-upcomingHeader">Upcoming</div>
      <div className="dashboard-upcomingContent">
        {posts.map((post, index) => {
          if (post.isEvent) {
            return (
              <div className="dashboard-upcomingTasks" key={post.id}>
                <div className="dashboard-task">
                  <h2 className="dashboard-taskDate">
                    {post.date.toString()}
                  </h2>
                  <h2 className="dashboard-taskName">PAD Event {post.id}</h2>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Upcoming;
