import React from "react";
import ReactFacebookLogin from "../../ReactFacebookLogin";

function SocialMedia() {
  return (
    <section>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-12">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 my-5">Welcome to my Social Media App</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quae, voluptatum, quod, voluptas quibusdam voluptates
                quidem
              </p>
            </div>

            <div className="mt-5">
              <ReactFacebookLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialMedia;
