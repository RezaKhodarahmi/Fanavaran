import React from 'react';

const Loading = () => {
    return (
        <div className="container-fluid text-center align-middle">
            <div className="container-fliud spinner-container ">
              <div className="row">
                <div className="col-12">
                  <div
                    class="spinner-border text-warning"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Loading...
                </div>
              </div>
            </div>
        </div>
    );
}

export default Loading;
