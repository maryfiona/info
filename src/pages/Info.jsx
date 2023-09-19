import React, { useState } from 'react';
import { google } from 'googleapis';

const Info = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    gender: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const sendDataToGoogleSheets = async () => {
    try {
      // Authenticate with Google Sheets API using your credentials
      const auth = await authorize();
      const sheets = google.sheets({ version: 'v4', auth });

      // Define the spreadsheet ID and range
      const spreadsheetId = 'YOUR_SPREADSHEET_ID';
      const range = 'Sheet1'; // Replace with the name of your sheet

      // Prepare the data
      const values = [[
        data.name,
        data.email,
        data.dob,
        data.phone,
        data.gender,
      ]];

      // Call the Google Sheets API to update the spreadsheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      });

      console.log('Data added to Google Sheets.');
    } catch (error) {
      console.error('Error adding data to Google Sheets:', error);
    }
  };

  // Function to authenticate with Google Sheets API using your credentials
  const authorize = async () => {
    const credentials = {
      installed: {
        client_id: 'YOUR_CLIENT_ID',
        project_id: 'YOUR_PROJECT_ID',
        auth_uri: 'YOUR_AUTH_URI',
        token_uri: 'YOUR_TOKEN_URI',
        client_secret: 'YOUR_CLIENT_SECRET',
        redirect_uris: ['YOUR_REDIRECT_URI'],
      },
    };

    const oAuth2Client = new google.auth.OAuth2(
      credentials.installed.client_id,
      credentials.installed.client_secret,
      credentials.installed.redirect_uris[0]
    );

    // You'll need to implement your own logic for obtaining and storing tokens,
    // as well as handling the authentication flow.

    // Make sure to set up the OAuth2 client correctly based on your needs.

    return oAuth2Client;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={data.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={data.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="DOB"
        name="dob"
        value={data.dob}
        onChange={handleInputChange}
      />
      <input
        type="tel"
        placeholder="Phone"
        name="phone"
        value={data.phone}
        onChange={handleInputChange}
      />
      <select
        name="gender"
        value={data.gender}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <button onClick={sendDataToGoogleSheets}>Send Data to Google Sheets</button>
    </div>
  );
};

export default Info;