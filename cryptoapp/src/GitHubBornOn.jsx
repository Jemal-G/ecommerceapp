import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';

function GitHubBornOn() {
  const [githubInfo, setGithubInfo] = useState({ 
    login: 'loading...', 
    created_at: 'loading...' 
  });

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const request = get({
          apiName: 'cryptoapi',
          path: '/born'
        });
        const response = await request.response;
        const data = await response.body.json();
        setGithubInfo(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGithubInfo({
          login: 'error',
          created_at: 'failed to load data'
        });
      }
    }
    fetchGitHubData();
  }, []);

  return (
    <div className="github-info">
      GitHub user {githubInfo.login} was born on {new Date(githubInfo.created_at).toLocaleDateString()}
    </div>
  );
}

export default GitHubBornOn;