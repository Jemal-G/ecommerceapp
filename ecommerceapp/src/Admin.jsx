/* src/Admin.jsx */
import { useState, useEffect } from 'react';
import './App.css';
import { Input, Button, List, message } from 'antd';
import { get, post, del } from 'aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './checkUser';

const initialState = {
  name: '',
  price: '',
};

function Admin() {
  const [itemInfo, updateItemInfo] = useState(initialState);
  const [state, setState] = useState({ products: [], loading: true });
  const [user, updateUser] = useState({});

  useEffect(() => {
    getProducts();
    checkUser(updateUser);
  }, []);

  // Fetch products from the backend
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

  // Update form state
  function updateForm(e) {
    const formData = {
      ...itemInfo,
      [e.target.name]: e.target.value,
    };
    updateItemInfo(formData);
  }

  // Add a product (admin only)
  async function addItem() {
    if (!user.isAdmin) {
      message.error("You do not have privilege to add a product.");
      return;
    }
    try {
      const data = {
        body: { ...itemInfo, price: parseInt(itemInfo.price) },
      };
      updateItemInfo(initialState);
      await post({
        apiName: 'ecommerceapi',
        path: '/products',
        options: data,
      });
      getProducts(); 
    } catch (err) {
      console.log('error adding item...', err);
    }
  }

  // Delete a product (admin only)
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

  // Like a product (all users, but here admin can too)
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
      {/* Always show the add product form on the Admin page */}
      <div style={containerStyle}>
        <Input
          name="name"
          onChange={updateForm}
          value={itemInfo.name}
          placeholder="Item name"
          style={inputStyle}
        />
        <Input
          name="price"
          onChange={updateForm}
          value={itemInfo.price}
          style={inputStyle}
          placeholder="Item price"
        />
        <Button style={buttonStyle} onClick={addItem}>
          Add Product
        </Button>
      </div>

      {/* Product list */}
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="default"
                onClick={() => likeItem(item.id)}
                key={`like-${item.id}`}
              >
                Like ({item.likes || 0})
              </Button>
              // No Delete button here!
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`$${item.price}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: '20px auto',
  backgroundColor: '#adb5ff',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(206, 9, 9, 0.2)',
};
const inputStyle = { marginTop: 10 };
const buttonStyle = { marginTop: 10 };

export default withAuthenticator(Admin);