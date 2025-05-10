/*
Copyright 2017 - 2025 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const fetch = require('node-fetch');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Suppress favicon requests with no content
app.get('/favicon.ico', (req, res) => res.status(204).end());

// GET /coins - fetches from Coinlore API
app.get('/coins', async (req, res) => {
  const params = req.apiGateway?.event?.queryStringParameters || {};
  const start = params.start || '0';
  const limit = params.limit || '10';
  const apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`;
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    res.json({ coins: json.data });
  } catch (error) {
    console.error('Error fetching coins:', error);
    res.status(500).json({ error: 'Failed to fetch coins' });
  }
});

// GET /born - fetches GitHub user info
app.get('/born', async (req, res) => {
  const params = req.apiGateway?.event?.queryStringParameters || {};
  const username = params.user || 'Jemal-G';
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const json = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: json.message });
    }
    res.json({ name: json.login, created_at: json.created_at });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

/**********************
 * Example catch-all  *
 **********************/
app.get('/item', (req, res) => {
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/item/*', (req, res) => {
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Export and local server  *
****************************/
if (require.main === module) {
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}

module.exports = app;
