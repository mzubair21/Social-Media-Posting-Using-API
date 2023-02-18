import React, { useRef } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import img from "../assets/muqeet.jpg";

const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

const uploadImage = async (file, props) => {
  const formData = new FormData();
  formData.append("url", file);

  try {
    // console.log(`${props.url}source=${img}&access_token=${props.access_token}`);
    const response = await axios.post(
      `${props.url}source=${img}&access_token=${props.access_token}`
    );
    alert(response.data);
  } catch (error) {
    alert(error);
  }
};

const FileUpload = (props) => {
  const fileInputRef = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const file = fileInputRef.current.files[0];
    const extension = file.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(extension)) {
      uploadImage(file, props);
    } else {
      alert(`Only ${allowedExtensions.join(", ")} files are allowed.`);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Choose an image file:</Form.Label>
        <Form.Control
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          ref={fileInputRef}
        />
        <Form.Text className="text-muted">
          Only .jpg, .jpeg, .png, and .gif files are allowed.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;
