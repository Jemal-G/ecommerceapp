import React, { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';

function GitHubBornOn() {
  const [githubData, setGithubData] = useState(null);
  const [username, setUsername] = useState('Jemal-G');

  const fetchGitHubBornOn = async () => {
    try {
      const request = get({
        apiName: 'crptoappi',
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
  };

  useEffect(() => {
    fetchGitHubBornOn();
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
      {!githubData ? (
        <p>Loading GitHub user info...</p>
      ) : githubData.error ? (
        <p style={{ color: 'red' }}>{githubData.error}</p>
      ) : (
        <p>
          My GitHub username is <b>{githubData.name}</b> and was created on <b>{githubData.created_at}</b>
        </p>
      )}
    </div>
  );
}

export default GitHubBornOn;
