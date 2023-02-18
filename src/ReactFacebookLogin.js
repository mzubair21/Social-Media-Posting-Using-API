import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";

const ReactFacebookLogin = () => {
  //Redux State Management remember User State
  const dispatch = useDispatch();

  //Error Message
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Short Access Token + User Data
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("fbAccessToken") || ""
  );
  //Long Access Token
  const [longAccessToken, setLongAccessToken] = useState(
    localStorage.getItem("fbLongAccessToken") || ""
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("fbUserId") || 0);
  const [userName, setUserName] = useState(
    sessionStorage.getItem("fbUserName") || ""
  );
  const [userImage, setUserImage] = useState(
    sessionStorage.getItem("fbUserImage") || ""
  );
  // Refresh Data on User Change
  useEffect(() => {
    // Check if user is already logged in
    const accessToken = localStorage.getItem("fbAccessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
    dispatch({
      type: "SET_USER",
      payload: {
        id: userId,
        name: userName,
        Image: userImage,
      },
    });
  }, [dispatch, userId, userName, userImage, longAccessToken]);

  // Copy Tokken
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [generateButtonText, setGenerateButtonText] = useState(
    longAccessToken !== "" ? "Copy Tokken" : "Generate"
  );
  // Copy Text and Generate Long Lived Token
  const handleCopyClick = async (e) => {
    //Short Tokken Copy
    if (e.target.innerText === "Copied!") {
      navigator.clipboard.writeText(accessToken);
    } else if (e.target.innerText === "Copy") {
      navigator.clipboard.writeText(accessToken);
      setCopyButtonText("Copied!");
    }
    //Long Tokken Copy
    else if (e.target.innerText === "Copied Token!") {
      navigator.clipboard.writeText(longAccessToken);
    } else if (
      e.target.innerText === "Generate" ||
      e.target.innerText === "Generate Long Tokken"
    ) {
      //Generate Long Lived Token
      setGenerateButtonText("Generating Tokken");
      e.preventDefault();
      const appId = "1534060853782602";
      const appSecret = "4d58356f39058c775f92b3dd736992cc";
      const shortLivedToken = accessToken;
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
        );
        setLongAccessToken(response.data.access_token);
        setGenerateButtonText("Generated Tokken");
        setSuccess("Long Live Tokken Generated !! Succssfully");
        localStorage.setItem("fbLongAccessToken", response.data.access_token);
      } catch (err) {
        setError(err.message);
      }
      setTimeout(() => {
        setGenerateButtonText("Copy Tokken");
      }, 1000);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    if (e.target.innerText === "Copy Tokken") {
      navigator.clipboard.writeText(longAccessToken);
      setGenerateButtonText("Copied Token!");
    }
  };

  //Facebook Login Pressed
  const componentClicked = (data) => {
    console.log("data: ", data);
  };
  //Facebook Login Success
  const responseFacebook = (response) => {
    console.log(response);
    sessionStorage.setItem("fbUserId", response.id);
    sessionStorage.setItem("fbUserName", response.name);
    sessionStorage.setItem("fbUserImage", response.picture.data.url);
    localStorage.setItem("fbAccessToken", response.accessToken);
    setAccessToken(response.accessToken);
    setUserId(response.id);
    setUserName(response.name);
    setUserImage(response.picture.data.url);
    dispatch({
      type: "SET_USER",
      payload: {
        id: userId,
        name: userName,
        Image: userImage,
      },
    });
  };
  //Facebook Logout
  const logoutFacebook = () => {
    sessionStorage.removeItem("fbUserId");
    sessionStorage.removeItem("fbUserName");
    localStorage.removeItem("fbAccessToken");
    setAccessToken("");
    setUserName("");
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <button
            className="btn btn-danger px-5 text-uppercase font-weight-normal"
            onClick={logoutFacebook}
          >
            Logout
          </button>
          <div className="pt-5">
            <Form.Group controlId="formFacebookShortToken">
              <Form.Label>Facebook Short Token</Form.Label>
              <div className="input-group">
                <Form.Control type="text" value={accessToken} readOnly />
                <div className="input-group-append">
                  <Button variant="secondary" onClick={handleCopyClick}>
                    {copyButtonText}
                  </Button>
                </div>
              </div>
            </Form.Group>
            <blockquote class="blockquote" onClick={handleCopyClick}>
              <p class="mb-0 btn btn-success mt-5">Generate Long Tokken</p>
              <footer class="blockquote-footer">
                {" "}
                <cite title="Source Title">3 Months Expiry</cite>
              </footer>
            </blockquote>
            {error !== "" || success !== "" ? (
              <div
                class={`alert ${
                  error !== "" ? "alert-danger" : "alert-success"
                } overflow-auto fade show`}
                role="alert"
              >
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>{(error, success)}</strong>
              </div>
            ) : null}

            <script>$(".alert").alert();</script>
          </div>
        </div>
      ) : (
        <FacebookLogin
          appId="1534060853782602"
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
      )}
      <blockquote class="blockquote" onClick={handleCopyClick}>
        <p class="mb-0 btn btn-success mt-5">
          {longAccessToken != ""
            ? "Graph Api Long Live Tokken"
            : "Generate Long Tokken"}
        </p>
        <footer class="blockquote-footer">
          {" "}
          <cite title="Source Title">3 Months Expiry</cite>
        </footer>
      </blockquote>
      <Form.Group className="py-2 mb-5" controlId="formFacebookLongToken">
        <Form.Label>Facebook Long Live Token</Form.Label>
        <div className="input-group">
          <Form.Control type="text" value={longAccessToken} readOnly />
          <div className="input-group-append">
            <Button variant="secondary" onClick={handleCopyClick}>
              {generateButtonText}
            </Button>
          </div>
        </div>
      </Form.Group>
    </div>
  );
};

export default ReactFacebookLogin;
