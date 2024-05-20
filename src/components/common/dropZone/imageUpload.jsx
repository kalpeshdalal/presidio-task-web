import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoMdCloseCircle } from 'react-icons/io';

const ImageUpload = ({ onUpload, value }) => {

  const [uploadedImage, setUploadedImage] = useState('');
  

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
      setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [onUpload]);

  const removeImage = () => {
    setUploadedImage(null);
  };
  useEffect(()=>{
    setUploadedImage(value);
  }, [value])

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px solid #ccc', borderRadius:'10px' ,padding: '10px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        {uploadedImage ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full flex  justify-end'><IoMdCloseCircle onClick={removeImage} style={{ cursor: 'pointer', }} /></div>
            <img src={(uploadedImage)} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100px' }} />
          </div>
        ) : (
          <p className=''>Drag & drop an image here, or click </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
