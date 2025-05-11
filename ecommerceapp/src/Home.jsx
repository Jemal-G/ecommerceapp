/* src/Home.jsx */
import { useState, useEffect } from 'react';
import { get, del, post } from 'aws-amplify/api';
import { List, Button } from 'antd';
import checkUser from './checkUser';

function Main() {
  const [state, setState] = useState({ products: [], loading: true });
  const [user, updateUser] = useState({});

  useEffect(() => {
    getProducts();
    checkUser(updateUser);
  }, []);

  useEffect(() => {
    console.log("user in Home.jsx:", user);
  }, [user]);

  async function getProducts() {
    try {
      const request = await get({
        apiName: 'ecommerceapi',
        path: '/products',
      });
      const { body } = await request.response;
      const data = await body.json();
      setState({
        products: data.data.Items,
        loading: false,
      });
    } catch (err) {
      console.log('error fetching products: ', err);
    }
  }

  async function deleteItem(id) {
    try {
      const products = state.products.filter((p) => p.id !== id);
      await del({
        apiName: 'ecommerceapi',
        path: `/products/${id}`,
      });
      setState({ ...state, products });
    } catch (err) {
      console.log('error deleting item: ', err);
    }
  }

  async function likeItem(id) {
    try {
      await post({
        apiName: 'ecommerceapi',
        path: `/products/${id}/like`,
      });
      getProducts();
    } catch (err) {
      console.log('error liking item: ', err);
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Serverless Final Project 2025</h2>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        {user.isAdmin ? 'Admin Dashboard' : 'Product List'} 
        {user.isAdmin && <span style={{ color: 'red' }}>(Admin)</span>}
      </h2>
      <h2 style={headerStyle}>Product List</h2>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        style={listStyle}
        renderItem={(item) => (
          <List.Item
            style={itemStyle}
            actions={[
              <Button
                type="default"
                onClick={() => likeItem(item.id)}
                key={`like-${item.id}`}
                style={buttonStyle}
              >
                Like ({item.likes || 0})
              </Button>,
              user.isAdmin && (
                <Button
                  type="primary"
                  danger
                  onClick={() => deleteItem(item.id)}
                  key={`delete-${item.id}`}
                  style={buttonStyle}
                >
                  Delete
                </Button>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              title={<span style={{ fontWeight: 500, fontSize: '1.2rem', textAlign: 'center', width: '50%', display: 'block' }}>{item.name}</span>}
              description={<span style={{ color: '#555' }}>${item.price}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

// Layout styles
const pageStyle = {
  margin: '40px auto',
  padding: 24,
  background: '#f8f9fa',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: 24,
  fontWeight: 700,
  color: '#2d3a4b',
};

const listStyle = {
  background: '#fff',
  borderRadius: 8,
  padding: 16,
};

const itemStyle = {
  padding: '12px 0',
  fontSize: '1.2rem',
  minWidth: '180px',
  borderBottom: '1px solid #f0f0f0',
};

const buttonStyle = {
  marginLeft: 8,
};

export default Main;