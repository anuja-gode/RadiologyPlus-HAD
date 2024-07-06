import React,{ useState, useEffect }  from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from 'react-bootstrap/Card';
import doctorImage from '../../Images/doctor.svg';
import LabImage from '../../Images/labs.svg';
import caseImage from '../../Images/cases.svg';
import patient from '../../Images/patient-robe-clothes-svgrepo-com.svg';
import Navbar from '../../Components/Navbar';
import { CssBaseline } from '@mui/material';
import axios from 'axios'; // Import Axios for making HTTP requests

const CustomPaper = styled(Paper)(({ theme }) => ({
  margin: '40px',
  marginTop: '40px',
  height: '75px',
  padding: theme.spacing(5),
  textAlign: 'center',
  color: '#000',
  boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& img': {
    maxWidth: '40%', // Adjust the width of the image as needed
  },
  '& .card-body': {
    flexGrow: 1, // Allow the text to take the remaining space
    padding: '10px', // Add padding as needed
    textAlign: 'center',
    
  },
}));

export default function Home() {
  const [counts, setCounts] = useState({
    totalDoctors: 0,
    totalLabs: 0,
    totalPatients: 0,
    totalCases: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyb24ud2Vhc2xleUBleGFtcGxlLmNvbSIsImlhdCI6MTcxNTEwNzI4OSwiZXhwIjoxNzE1MTQzMjg5fQ.UOQ1SWHQLB3DE8vQNKqDfbK7qiBTJ_B1nc6wlEFU5zsSZZtgdmflEaDmuQxir0-r';
        const response = await axios.get('http://localhost:9191/api/v1/admin/entity-counts', {
          headers: {
            Authorization: `Bearer ${token}` // Set the Authorization header with the token
          }
        }); // Make a GET request to fetch counts
        setCounts(response.data); // Update state with fetched counts
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const cardData = [
    { title: 'Number Of Doctors', number: counts.totalDoctors, image: doctorImage, color:'#F7DFFF' },
    { title: 'Number of Labs', number: counts.totalLabs , image: LabImage, color: '#EEFF86'},
    { title: 'Number of Patients', number: counts.totalPatients, image: patient, color:'#CDD8FD'},
    { title: 'Number of Cases', number: counts.totalCases, image:caseImage, color:'#BDFFB2' },
  ];
  return (
    <body className='this-div'>
      <Navbar userRole ="admin"/>
      <CssBaseline/>
      <h1> WELCOME ADMIN!</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CustomPaper style={{ backgroundColor: 'white'}}>
                <img src={card.image} alt={card.title} />
                <Card.Body>
                  <Card.Title style={{fontSize: '40px', fontWeight:'bold'}}>{card.number}</Card.Title>
                  <Card.Subtitle>{card.title}</Card.Subtitle>
                </Card.Body>
              </CustomPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </body>
  );
}