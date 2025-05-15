import React from 'react'

// List of individual React concepts with definitions
const blogPosts = [
  {
    id: 1,
    title: 'Props',
    content: 'Props are read-only components used to pass data from one component to another.',
  },
  {
    id: 2,
    title: 'Component',
    content: 'A component is a reusable piece of UI that can be functional or class-based.',
  },
  {
    id: 3,
    title: 'JSX',
    content: 'JSX is a syntax extension that looks similar to HTML and is used with React to describe the UI structure.',
  },
  {
    id: 4,
    title: 'State',
    content: 'State represents mutable data that changes over time and influences the component’s behavior and rendering.',
  },
  {
    id: 5,
    title: 'Effect',
    content: 'useEffect is a Hook that performs side effects in functional components, like fetching data or updating the DOM.',
  },
  {
    id: 6,
    title: 'Hooks',
    content: 'Hooks are functions like useState or useEffect that let you use state and lifecycle features in functional components.',
  },
  {
    id: 7,
    title: 'Virtual DOM',
    content: 'The Virtual DOM is a lightweight copy of the real DOM that React uses to improve performance by minimizing direct DOM manipulation.',
  },
  {
    id: 8,
    title: 'Conditional Rendering',
    content: 'Conditional rendering lets you render components or elements based on certain conditions using JS logic inside JSX.',
  },
  {
    id: 9,
    title: 'Lazy Loading',
    content: 'Lazy loading helps reduce the initial load time by loading components or resources only when they are needed.',
  },
  {
    id: 10,
    title: 'Context API',
    content: 'Context API provides a way to share state/data globally between components without passing props manually.',
  },
  {
    id: 11,
    title: 'Gen1 & Gen2',
    content: 'These may refer to different generations or phases of a project or architecture design (provide specific context if needed).',
  },
  {
    id: 12,
    title: 'Fragment',
    content: 'A React Fragment lets you group multiple elements without adding extra nodes to the DOM.',
  },
  {
    id: 13,
    title: 'REST',
    content: 'REST is an architectural style for designing networked applications, often used with HTTP APIs in React projects.',
  },
  {
    id: 14,
    title: 'GraphQL',
    content: 'GraphQL is a query language for APIs that allows clients to request exactly the data they need.',
  },
  {
    id: 15,
    title: 'Ant Design in Projects',
    content: 'Ant Design provides enterprise-level UI components for building rich user interfaces.',
  },
]

function Project05() {
  return (
    <div>
      <h2>Project05 some React Concepts</h2>
      {blogPosts.map((post) => (
        <div key={post.id} style={{borderRadius: '5px',margin: '2rem auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign:'Left',borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Project05
