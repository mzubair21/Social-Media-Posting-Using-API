import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Sprout() {
  const apiKey = "5a87c3ac358b492b9197efcdfb7c216c";
  const videoRef = useRef();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSrc, setRecordedSrc] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [folderId, setFolderId] = useState("029fdbbc121fe78c");

  useEffect(() => {
    const video = videoRef.current;
    video.controls = true;
    return () => {
      video.srcObject = null;
    };
  }, []);

  const handleStartRecord = async () => {
    // access the user's camera and microphone
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // set the video stream as the source for the video element
    videoRef.current.srcObject = stream;
    videoRef.current.muted = true;
    videoRef.current.controls = false;
    videoRef.current.play();

    // create a new MediaRecorder instance to record the video stream
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    // listen for data available events and add the data to the chunks array
    mediaRecorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    // listen for stop events and create a new Blob from the recorded chunks
    mediaRecorder.addEventListener("stop", () => {
      setRecordedChunks(chunks);
      const recordedStream = new Blob(chunks, { type: "video/mp4" });
      videoRef.current.srcObject = null;
      setRecordedSrc(URL.createObjectURL(recordedStream));
      videoRef.current.src = URL.createObjectURL(recordedStream);
    });

    // start recording and set the recording state to true
    mediaRecorder.start();
    setIsRecording(true);
    setMediaRecorder(mediaRecorder);
  };

  const handleStopRecord = async () => {
    // stop the MediaRecorder instance
    mediaRecorder.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    videoRef.current.controls = true;
    videoRef.current.muted = false;
    setIsRecording(false);
  };

  const handleCreateFolder = async () => {
    const folderName = "Test Subscriber";
    const data = JSON.stringify({ name: folderName });
    try {
      var config = {
        method: "post",
        url: "https://api.sproutvideo.com/v1/folders?api_key=${apiKey}",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      // setFolderId(response.data.id);
      console.log("Folder created successfully:", response);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleUpload = async () => {
    // create a new folder if one doesn't exist
    // if (!folderId) {
    handleCreateFolder();
    // }
    // create a new Blob from the recorded chunks and ensure it's in the correct format

    const blob = new Blob(recordedChunks, { type: "video/mp4" });

    // create a new FormData object to store the video file
    const formData = new FormData();
    formData.append("source_video", blob, "recorded-video.mp4");
    formData.append("title", "Recorded Video");
    formData.append("Description", "Recorded Video Description");
    formData.append("download_hd", true);
    formData.append("download_sd", true);

    // send a POST request to the SproutVideo API to upload the video
    try {
      const response = await axios.post(
        `https://api.sproutvideo.com/v1/videos?api_key=${apiKey}&folder_id=${folderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Video uploaded successfully:", response.data);
      alert("Video uploaded successfully");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="card-title p-4">Sprout Video Recording</h1>
      <div className="row">
        <div className="col-md-8">
          <video
            className="col-12 p-0 m-0"
            ref={videoRef}
            style={{ background: "grey" }}
            height="400"
            id="video"
            autoPlay
          ></video>
        </div>

        <div className=" col-md-4 d-flex justify-content-center pt-2 align-items-center ">
          {!isRecording ? (
            <button
              className="btn btn-outline-success"
              onClick={handleStartRecord}
            >
              Start RECORD
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleStopRecord}>
              Stop RECORD
            </button>
          )}
          {recordedChunks.length > 0 && (
            <button className="btn btn-primary ml-4" onClick={handleUpload}>
              Upload Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sprout;
