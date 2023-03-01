import React, { useRef } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const FileUpload = ({
  type,
  url,
  pageId,
  fileType,
  access_token,
  message,
  Id_token,
}) => {
  const fileInputRef = useRef(null);

  var file;
  var postId = "";

  const allowedExtensions =
    type === "photo"
      ? ["jpg", "jpeg", "png", "gif"]
      : ["mp4", "mov", "avi", "wmv"];

  const handleFileSubmit = () => {
    file = fileInputRef.current.files[0];
    const extension = file.name.split(".").pop().toLowerCase();
    if (allowedExtensions.includes(extension)) {
    } else {
      alert(`Only ${allowedExtensions.join(", ")} files are allowed.`);
    }
  };
  //FB API CALL
  const uploadImageFb = async () => {
    const formData = new FormData();
    formData.append("source", file);
    if (type === "photo") {
      formData.append("message", message);
    } else if (type === "video") {
      formData.append("description", message);
    }

    try {
      const response = await axios.post(
        `${url}${pageId}/${fileType}?access_token=${access_token}`,
        formData
      );
      postId = response.data.post_id;
      if (type === "photo") {
        alert("Image Posted Sucessfully");
      } else {
        alert("Video Posted Sucessfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error Occured in Posting - Check Console");
    }
  };
  //Insta Upload Api Call
  const uploadImageInsta = async () => {
    // if (type === "photo") {
    //   formData.append("message", message);
    // } else if (type === "video") {
    //   formData.append("description", message);
    // }
    try {
      //console.log("Geeting Insta ID");
      const instaIdUrl = `${url}${pageId}?fields=instagram_business_account&access_token=${Id_token}`;
      const response = await axios.get(instaIdUrl);
      const instaId = response.data.instagram_business_account.id;
      alert("insta ID" + instaId);
      console.log("Geeting Facebook Image");
      const apiUrl = `https://graph.facebook.com/v13.0/${postId}?fields=full_picture&access_token=${access_token}`;
      const responseImage = await axios.get(apiUrl);
      const imageUrl = responseImage.data.full_picture;
      alert("imageUrl" + imageUrl);
      console.log("Pushing Image to Insta Container");
      const response2 = await axios.post(
        `https://graph.facebook.com/v13.0/${instaId}/media?access_token=${Id_token}`,
        {
          image_url: imageUrl,
          caption: message,
        }
      );

      const publishToken = response2.data.id;
      alert("publishToken" + publishToken);

      //Container Publish
      const instaContainerPublishUrl = `${url}${instaId}/media_publish?creation_id=${publishToken}&access_token=${Id_token}`;
      console.log(instaContainerPublishUrl);
      const response3 = await axios.post(instaContainerPublishUrl);
      console.log(response3.data.id);

      // const response2 = await axios.post(instaContainerUrl).catch((err) => {});
      // console.log(response2);
      // if (type === "photo") {
      //   alert("Image Posted Sucessfully");
      // } else {
      //   alert("Video Posted Sucessfully");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInstaUpload = (e) => {
    e.preventDefault();
    if (postId === "") {
      alert("Please Upload Image to Facebook First");
    } else {
      uploadImageInsta();
    }
  };
  const handleFbUpload = (e) => {
    e.preventDefault();
    handleFileSubmit();
    uploadImageFb();
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Choose a {type} file:</Form.Label>
        <Form.Control
          type="file"
          accept={`.${allowedExtensions.join(",.")}`}
          ref={fileInputRef}
        />
        <Form.Text className="text-muted mb-2">
          Only {allowedExtensions.join(", ")} files are allowed.
        </Form.Text>
      </Form.Group>
      <Button className="mr-3" variant="primary" onClick={handleFbUpload}>
        Upload Facebook
      </Button>
      <Button variant="danger" onClick={handleInstaUpload}>
        Upload Instagram
      </Button>
    </Form>
  );
};

export default FileUpload;
