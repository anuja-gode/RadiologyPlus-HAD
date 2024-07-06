import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar';
import Button from '@mui/material/Button';
import axios from 'axios'; // Import Axios for making HTTP requests

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  height: '100vh', // Adjust the height as needed
};

const leftStyle = {
  flex: 1,
  padding: '20px',
  overflowY: 'auto'
};

const rightStyle = {
  flex: 1,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const dividerStyle = {
  width: '2px',
  background: '#ccc',
  margin: '0 20px', // Adjust margin as needed
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const cardStyle = {
  marginTop: '20px',
  width: '70%',
  textAlign: 'left',
  fontFamily: '"Quicksand", sans-serif',
  background: '#F0F7F9',
  boxShadow: 'none',
};

const senderTextStyle = {
  fontSize: '1.2vw',
  fontFamily: '"Quicksand", sans-serif'
};

const contentStyle = {
  fontSize: '0.9vw',
  fontFamily: '"Quicksand", sans-serif'
};

const radioContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyle = {
  marginLeft: '10px', // Adjust spacing between buttons as needed
};

const Consent = () => {
  const [invitations, setInvitations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [consentCards, setConsentCards] = useState([]);
  const [senderEmail, setSenderEmail] = useState("anujag78@gmail.com");
  const [selectedCardId, setSelectedCardId] = useState(null); // New state to hold the selected card ID

  const handleNotificationButtonClick = async () => {
    try {
      const response = await axios.post('http://localhost:9191/api/v1/authenticate/list-notifications', { email: 'anujag78@gmail.com' });
      setInvitations(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleConsentButtonClick = async () => {
    try {
      const response = await axios.post('http://localhost:9191/api/v1/patient/consent-details', { email: 'anujag78@gmail.com' });
      setConsentCards(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching consent cards:', error);
    }
  };

  const handleSelectButtonClick = async () => {
    if (selectedCardId) { // Use selectedCardId instead of selectedCard
      try {
        const selectedConsentCard = consentCards.find(card => card.index === selectedCardId);
        const { caseId, email } = selectedConsentCard;
        console.log(caseId);
        const senderEmail = 'anujaj78@gmail.com';

        await axios.post('http://localhost:9191/api/v1/patient/sendNotifications', { caseId, email, senderEmail });
        console.log('Selected consent card sent to the backend:', { caseId, email, senderEmail });
      } catch (error) {
        console.error('Error sending selected consent card to the backend:', error);
      }
    } else {
      console.log('No consent card selected.');
    }
  };

  const handleConsentCardSelect = (index) => {
    console.log("Selected card ID:", index);
    setSelectedCardId(index); // Update selectedCardId state instead of setSelectedCard
  };

  return (
    <div>
      <Navbar userRole="patient" />
      <div style={containerStyle}>
        <div style={leftStyle}>
          <div style={buttonContainerStyle}>
            <Button variant="contained" onClick={handleNotificationButtonClick}>Notification</Button>
          </div>
          <Grid container spacing={3}>
            {invitations.map((invitation) => (
              <Grid item xs={12} key={invitation.id}>
                <Card
                  style={cardStyle}
                  onClick={() => setSelectedCard(invitation.id)}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" style={senderTextStyle}>
                      {invitation.senderName} has invited you
                    </Typography>
                    <Typography variant="body2" component="p" style={contentStyle}>
                      Case Summary: {invitation.caseSummary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={dividerStyle}></div>
        <div style={rightStyle}>
          <div style={{ ...buttonContainerStyle, marginBottom: '10px' }}>
            <Button variant="contained" onClick={handleConsentButtonClick}>Consent</Button>
            <Button variant="contained" onClick={handleSelectButtonClick} style={buttonStyle}>Select</Button>
          </div>
          {consentCards.map((consentCard, index) => (
            <Card key={index} style={cardStyle}>
              <CardContent>
                <input
                  type="radio"
                  name="consentCard"
                  value={consentCard.id}
                  checked={selectedCardId === consentCard.id}
                  onChange={() => {
                    console.log("Radio button clicked with ID:", consentCard.id);
                    handleConsentCardSelect(consentCard.id);
                  }}
                />
                <Typography variant="h6" component="div">
                  Case ID: {consentCard.caseId}
                </Typography>
                <Typography variant="body2" component="p">
                  Hospital Name: {consentCard.hospitalName}
                </Typography>
                <Typography variant="body2" component="p">
                  Registration Date: {consentCard.caseRegistration}
                </Typography>
                <Typography variant="body2" component="p">
                  Status: {consentCard.status}
                </Typography>
                <Typography variant="body2" component="p">
                  Doctor Name: {consentCard.dname}
                </Typography>
                <Typography variant="body2" component="p">
                  Doctor Email: {consentCard.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Consent;
