import "./App.css";
import Nav from "./Components/Nav";
import ReactFacebookLogin from "./ReactFacebookLogin";
import FileUpload from "./FileUpload";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App ">
        <Nav />
        <div className="container">
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
          >
            <div className="col-12 col-md-6 ">
              <h1 className="display-4 my-5">Welcome to my Social Media App</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quae, voluptatum, quod, voluptas quibusdam voluptates
                quidem
              </p>
              <div className="mt-5">
                <ReactFacebookLogin />
              </div>
            </div>
          </div>
        </div>
        <FileUpload
          caption="hello Muqeet"
          photoUrl="https://scontent.fisb16-1.fna.fbcdn.net/v/t1.6435-9/123826371_3596674190391973_441176943100405873_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F9Ajy69VLtYAX-qN9rd&_nc_ht=scontent.fisb16-1.fna&oh=00_AfAFt6cRohi6PI5oMe144vXSdZ2bPuIWNa2D3NEnpLhcdA&oe=64162FB5"
        />
      </div>
    </Provider>
  );
}

export default App;
