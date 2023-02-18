import React, { useRef } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const FileUpload = ({ type, url, access_token, message }) => {
  const fileInputRef = useRef(null);

  const allowedExtensions =
    type === "photo"
      ? ["jpg", "jpeg", "png", "gif"]
      : ["mp4", "mov", "avi", "wmv"];

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("source", file);
    if (type === "photo") {
      formData.append("message", message);
    } else if (type === "video") {
      formData.append("description", message);
    }

    try {
      const response = await axios.post(
        `${url}?source=${file}&access_token=${access_token}`,
        formData
      );
      if (type === "photo") {
        alert("Image Posted Sucessfully");
      } else {
        alert("Video Posted Sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const file = fileInputRef.current.files[0];
    const extension = file.name.split(".").pop().toLowerCase();
    if (allowedExtensions.includes(extension)) {
      uploadFile(file);
    } else {
      alert(`Only ${allowedExtensions.join(", ")} files are allowed.`);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Choose a {type} file:</Form.Label>
        <Form.Control
          type="file"
          accept={`.${allowedExtensions.join(",.")}`}
          ref={fileInputRef}
        />
        <Form.Text className="text-muted">
          Only {allowedExtensions.join(", ")} files are allowed.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;
