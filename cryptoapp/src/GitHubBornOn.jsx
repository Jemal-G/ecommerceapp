import React, { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';

function GitHubBornOn() {
  const [githubData, setGithubData] = useState(null);
  const [username, setUsername] = useState('Jemal-G'); 
  async function fetchGitHubBornOn() {
    try {
      // Pass the username as a query param: ?user=<username>
      const request = get({
        apiName: 'cryptoapi',
        path: `/born?user=${username}`,
      });
      const response = await request.response;
      const data = await response.body.json();

      console.log('GitHub user data:', data);
      setGithubData(data);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setGithubData(null);
    }
  }

  // Fetch once on mount 
  useEffect(() => {
    fetchGitHubBornOn();
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
    
      {/* Show loading or error if no data */}
      {!githubData ? (
        <p>Loading GitHub user info...</p>
      ) : githubData.error ? (
        <p style={{ color: 'red' }}>{githubData.error}</p>
      ) : (
        <p>
          The GitHub user <b>{githubData.name}</b> was born on{' '}
          <b>{githubData.created_at}</b>
        </p>
      )}
    </div>
  );
}

export default GitHubBornOn;
