import React, { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';

function GitHubBornOn() {
  const [githubData, setGithubData] = useState(null);
  const [username, setUsername] = useState('Jemal-G'); 
  

  async function fetchGitHubBornOn() {
    try {
      const op = get({
        apiName: 'cryptoapi',
        path: '/born',
        options: { queryParams: { user: username } }
      });
      const { response } = op;
      const { body } = await response;
      const json = await body.json();
      setGithubData(json);
    } catch (e) {
      console.error('Error fetching GitHub data:', e);
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
          MyGitHub user name is <b>{githubData.name}</b> was born on{' '}
          <b>{githubData.created_at}</b>
        </p>
      )}
    </div>
  );
}

export default GitHubBornOn;
