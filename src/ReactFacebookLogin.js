import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import img from "./assets/muqeet.jpg";
import FileUpload from "./Components/FileUpload";

const ReactFacebookLogin = () => {
  //Redux State Management remember User State
  const dispatch = useDispatch();

  //Error Message
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Post Message
  const [postMessage, setPostMessage] = useState("");

  //Long Access Token
  const [longAccessToken, setLongAccessToken] = useState(
    localStorage.getItem("fbLongAccessToken") || ""
  );

  //Long Page Access Token
  const [longPageAccessToken, setLongPageAccessToken] = useState(
    localStorage.getItem("fbLongPageAccessToken") || ""
  );
  //Short Access Token + User Data
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("fbAccessToken") || ""
  );
  const [userId, setUserId] = useState(localStorage.getItem("fbUserId") || 0);
  const [userName, setUserName] = useState(
    localStorage.getItem("fbUserName") || ""
  );
  const [userImage, setUserImage] = useState(
    localStorage.getItem("fbUserImage") || ""
  );

  const [pageId, setPageId] = useState(localStorage.getItem("fbPageId") || "");
  const [pageName, setPageName] = useState(
    localStorage.getItem("fbPageName") || ""
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
    longAccessToken !== ""
      ? accessToken !== ""
        ? "Generate"
        : "Copy Tokken"
      : "Generate"
  );
  const [generatePageButtonText, setGeneratePageButtonText] =
    useState("Copy Tokken");

  // Facebook Login
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

        //Populate Table for User ID and Page ID
        try {
          const response2 = await axios.get(
            `https://graph.facebook.com/v12.0/me/accounts?access_token=${longAccessToken}`
          );
          console.log(response2);
          setPageId(response2.data.data[0].id);
          setPageName(response2.data.data[0].name);
          localStorage.setItem("fbPageId", response2.data.data[0].id);
          localStorage.setItem("fbPageName", response2.data.data[0].name);
          console.log(response2.data.data[0].access_token);
        } catch (err) {
          alert(err.message);
        }
        //Generate Long Lived Page Token
        try {
          const response3 = await axios.get(
            `https://graph.facebook.com/v12.0/${userId}/accounts?access_token=${longAccessToken}`
          );
          setLongPageAccessToken(response3.data.data[0].access_token);
          localStorage.setItem(
            "fbLongPageAccessToken",
            response3.data.data[0].access_token
          );

          //Generate Long Lived Page Token
        } catch (err) {
          setError(err.message);
        }

        ///End Page Tokken
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
    localStorage.setItem("fbUserId", response.id);
    localStorage.setItem("fbUserName", response.name);
    localStorage.setItem("fbUserImage", response.picture.data.url);
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
    localStorage.removeItem("fbUserId");
    localStorage.removeItem("fbUserName");
    localStorage.removeItem("fbAccessToken");
    setAccessToken("");
    setUserName("");
  };

  //Post Facebook Status
  const handlePostStatus = async (e) => {
    e.preventDefault();
    const url = `https://graph.facebook.com/v12.0/101314906231016/feed?message=${postMessage}&access_token=${longPageAccessToken}`;
    axios
      .post(url, {})
      .then((res) => {
        setPostMessage("");
        alert("Status Posted Successfully");
      })
      .catch((err) => {
        alert(err.message);
        setError(err.message);
      });
  };

  //Post Facebook Image
  const handlePostImage = async (e) => {
    e.preventDefault();
    const url = `https://graph.facebook.com/v12.0/101314906231016/feed?message=${postMessage}&access_token=${longPageAccessToken}`;
    axios
      .post(url, {})
      .then((res) => {
        setPostMessage("");
        alert("Status Posted Successfully");
      })
      .catch((err) => {
        alert(err.message);
        setError(err.message);
      });
  };

  return (
    <div>
      {accessToken ? (
        <div className="col-md-6 m-auto">
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
      <div className="col-md-6 m-auto">
        <blockquote className="blockquote" onClick={handleCopyClick}>
          <p className="mb-0 btn btn-success mt-5">
            {longAccessToken !== ""
              ? accessToken !== ""
                ? "Generate Long Tokken"
                : "Graph Api Long Live Tokken"
              : "Generate Long Tokken"}
          </p>
          <footer className="blockquote-footer">
            {" "}
            <cite title="Source Title">3 Months Expiry</cite>
          </footer>
        </blockquote>
        <Form.Group className="py-2 " controlId="formFacebookLongToken">
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
        <Form.Group className="py-2 " controlId="formFacebookLongToken">
          <Form.Label>Page Long Live Token</Form.Label>
          <div className="input-group">
            <Form.Control type="text" value={longPageAccessToken} readOnly />
            <div className="input-group-append">
              <Button variant="secondary" onClick={handleCopyClick}>
                {generatePageButtonText}
              </Button>
            </div>
          </div>
        </Form.Group>
        {error !== "" || success !== "" ? (
          <div
            className={`alert ${
              error !== "" ? "alert-danger" : "alert-success"
            } overflow-auto fade show`}
            role="alert"
          >
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>
              {error} {success}
            </strong>
          </div>
        ) : null}
      </div>
      <table className="table table-striped table-inverse table-responsive w-max rounded border my-3">
        <thead className="thead-inverse">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Page ID</th>
            <th>Page</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userId}</td>
            <td>{userName}</td>
            <td>{pageId}</td>
            <td>{pageName}</td>
          </tr>
        </tbody>
      </table>
      <div className="col-md-6 m-auto mt-5 pt-5">
        <h3 className="h2">Facebook Page Post</h3>
        <div className="form-group">
          <form className="" onSubmit={handlePostStatus}>
            <label htmlFor=""></label>
            <input
              type="text"
              name="message"
              id=""
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
              className="form-control"
            ></input>
            <button type="submit" className="btn btn-primary mt-3">
              Post Status
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-6 m-auto mt-5 pt-5">
        <h3 className="h2">Facebook Image Post</h3>
        <div className="form-group">
          <form className="" onSubmit={handlePostImage}>
            <label htmlFor=""></label>
            <input
              type="text"
              name="message"
              id=""
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
              className="form-control"
            ></input>
            <div className="form-group">
              <label htmlFor=""></label>
              <input
                type="file"
                className="form-control-file"
                name=""
                id=""
                placeholder=""
                aria-describedby="fileHelpId"
              ></input>
              <small id="fileHelpId" className="form-text text-muted">
                Help text
              </small>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Post Image
            </button>
          </form>
          <FileUpload
            url={`https://graph.facebook.com/${pageId}/photos?`}
            access_token={accessToken}
            source={img}
          />
        </div>
      </div>
    </div>
  );
};

export default ReactFacebookLogin;
