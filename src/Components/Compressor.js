import React, {useState} from 'react';
import imageCompression from "browser-image-compression";
import './Compressor.css';
import Download from '../Images/Download.png';
import Upload from '../Images/Upload.png';
import {Navbar, Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
function Compressor() {

    function uploadLink(event){
        //To get the image file which user had uploaded in the input field
        const imageFile = event.target.files[0];
        
        // Create a DOMString containing a URL that represents the imageFile
        setOriginalLink(URL.createObjectURL(imageFile));
        
        //Now set the original image link, name of output file and upload image state
        setOriginalImage(imageFile);
        setOutputFileName(imageFile.name);
        setUploadImage(true);
    }
    function click(e){
        e.preventDefault();
        //You should provide one of maxSizeMB, maxWidthOrHeight in the options that will be passed to imageCompression component.
      const options = 
      { 
        maxSizeMB: 3, 
        maxWidthOrHeight: 800, 
        useWebWorker: true 
      }; 
      if (options.maxSizeMB >= originalImage.size / 1024) { 
        alert("Bring a bigger image"); 
        return 0; 
      } 
      //this code will compress the original image 
      let output; 
      imageCompression(originalImage, options).then(x => { 
      output = x; 
      const downloadLink = URL.createObjectURL(output); setCompressedLink(downloadLink); 
      }); 
      setClicked(true); return 1; };
    
    const [compressedLink, setCompressedLink] = useState("");
const [originalImage, setOriginalImage] = useState("");
const [originalLink, setOriginalLink] = useState("");
const [clicked, setClicked] = useState(false);
const [uploadImage, setUploadImage] = useState(false);
    const [outputFileName, setOutputFileName] = useState("");
    

  

  return(
      <div>
       <div className="mainContainer">
      <Navbar className="navbar justify-content-center" bg="light" variant="light">
        <Navbar.Brand className="navbar-content" href="/">
          <FontAwesomeIcon className="social-icons changeOn" icon={faImage} size={1} />{' '}
          Image Compressor
        </Navbar.Brand>
      </Navbar>
        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {uploadImage ? (
              <Card.Img
                className="image"
                 variant="top"
                             
                src={originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="uploadCard"
                                  variant="top"
                                  height="200px"
                                  width="250px"
                src={Upload}
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center upload-btn-wrapper">
            <button class="btn btn-dark">Upload a file</button>
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={event => uploadLink(event)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-4 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {outputFileName ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={e => click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img className="image" variant="top" src={compressedLink}></Card.Img>
            {clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={compressedLink}
                  download={outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : (
              <Card.Img
                className="uploadCard"
                                  variant="top"
                                  width="200px"
                                  height="200px"
                src={Download}
              ></Card.Img>
            )}
        </div>
    </div>
</div>   
        
    </div>
  )  
}

export default Compressor;