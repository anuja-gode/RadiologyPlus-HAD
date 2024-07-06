import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatRoom from '../../Components/ChatRoom';
import Navbar from '../../Components/Navbar';

const OHIFRadiologist = () => {
  const [jsonUrl, setJsonUrl] = useState('');
  const [annotatedImageBase64, setAnnotatedImageBase64] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdW5hLmxvdmVnb29kQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE0NzY4MzU3LCJleHAiOjE3MTQ4MDQzNTd9.vhDTXQAv1KO3vsa69ICyxd9KtipYoFC6V7C9AO6Is5--1WfngBlJf8P4DMCGM_4o'; // Update with your authentication token
        const response = await axios.get('http://localhost:9191/api/v1/doctor/get-json-aws-url', {
          params: {
            caseId: 1
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setJsonUrl(response.data);
      } catch (error) {
        console.error('Error fetching JSON URL:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setAnnotatedImageBase64(base64String);
        console.log(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    try {
      const authToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdW5hLmxvdmVnb29kQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE0NzY4MzU3LCJleHAiOjE3MTQ4MDQzNTd9.vhDTXQAv1KO3vsa69ICyxd9KtipYoFC6V7C9AO6Is5--1WfngBlJf8P4DMCGM_4o'; // Update with your authentication token
      const response = await axios.post(
        'http://localhost:9191/api/v1/radiologist/upload-image-annotated',
        {
          caseId: 1,
          radiologistEmail: 'luna.lovegood@example.com', // Update with the radiologist's email
          finalRemarks: 'Your final remarks here',
          annotatedImageBase64: 'hi'
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', overflow: 'hidden' }}>
      <Navbar userRole="doctor" />
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <div style={{ width: '50vw', height: '90%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70vh', background: '#FFFFFF', overflow: 'hidden' }}>
            <ChatRoom />
          </div>
        </div>
        <div style={{ flex: '1', overflow: 'hidden' }}>
          <input type="file" accept="image/jpeg, image/png" onChange={handleFileInputChange} />
          <button onClick={handleUploadImage}>Upload Annotated Image</button>
          <iframe
            title="OHIF"
            src={jsonUrl}
            style={{ width: '100%', height: '100%', border: 'none', marginRight: '1%', overflow: 'hidden' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default OHIFRadiologist;
