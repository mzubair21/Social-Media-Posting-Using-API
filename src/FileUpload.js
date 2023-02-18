import React from "react";
import axios from "axios";
import { useState } from "react";

const FileUpload = (phptoUrl, caption) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    try {
      setIsUploading(true);

      const response = await axios.post(
        `https://graph.facebook.com/v13.0/101314906231016/photos`,
        {
          url: phptoUrl,
          caption: caption,
          access_token:
            "EAAVzOGBA6EoBAHKNPtdmPNKKZAZB7aZCAVGGYlHAYGQzk9lJr8s1cbsV7CpqCtz1T9joZAiYF6nOaCTfTZCb9xjZBSCExxtZC44OFMsTawZBFNlk5NM6TSHxuVc4yT5Eo5ZBKaccuZBJxZCEymkUkZBbV2o3C7R30K2j1LcJJdheJUuXlj8dE6zpSWs5",
        }
      );
      console.log(response);
      setIsUploading(false);
    } catch (error) {
      setError(error);
      setIsUploading(false);
    }
  };

  return (
    <div>
      Hello
      {isUploading ? (
        <p>Uploading...</p>
      ) : (
        <button onClick={handleUpload}>Upload</button>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default FileUpload;
