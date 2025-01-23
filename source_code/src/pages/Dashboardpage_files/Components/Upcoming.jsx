import React from "react";
import "./Upcoming.css";

function Upcoming({ posts }) {
  return (
    <div className="dashboard-upcomingContainer">
      <div className="dashboard-upcomingHeader">Upcoming</div>
      <div className="dashboard-upcomingContent">
        {posts.some((post) => post.isEvent) ? (
          posts.map((post) => {
            if (post.isEvent) {
              return (
                <div className="dashboard-upcomingTasks" key={post._id}>
                  <div className="dashboard-task">
                    <h2 className="dashboard-taskDate">
                      {post.eventDate.toString()}
                    </h2>
                    <h2 className="dashboard-taskName">{post.content}</h2>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <h2 style={{ fontFamily: "Segoe UI", textAlign: "center", marginTop: "20px"}}>
            There are currently no events.
          </h2>
        )}
      </div>
    </div>
  );
}

export default Upcoming;
