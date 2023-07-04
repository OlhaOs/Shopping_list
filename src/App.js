import { useState, useEffect } from 'react';
import { Button, Typography, Container, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import BasicAlerts from './Alert';
import './App.css';
import ProductList from './ProductList';

function App() {
  const [products, setProducts] = useState('');
  const [quantity, setQuantity] = useState('');
  const [listOfProducts, setListOfProduct] = useState(
    JSON.parse(localStorage.getItem('list')) || []
  );
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(listOfProducts));
  }, [listOfProducts]);

  const handleClickButton = () => {
    if (!products) {
      setShowWarning(true);
      return;
    }
    setListOfProduct([
      ...listOfProducts,
      { products, quantity: quantity || 1, completed: false },
    ]);
    setProducts('');
    setQuantity('');
  };
  const purchaseIsDone = id => {
    const updatedList = listOfProducts.map((item, index) => {
      if (index === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setListOfProduct(updatedList);
  };

  const handleRemoveCompleted = () => {
    const updatedList = listOfProducts.filter(item => !item.completed);
    setListOfProduct(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList));
  };
  return (
    <div className='App'>
      <Typography variant='h6' m={6}>
        Shopping list
      </Typography>
      <Container maxWidth='sm'>
        <Grid container mb={2} spacing={1}>
          <Grid xs={6}>
            <TextField
              id='outlined-basic'
              label='product'
              variant='outlined'
              placeholder='input product name'
              value={products}
              onChange={e => {
                setProducts(e.target.value);
                setShowWarning(false);
              }}
              sx={{ width: '100%', padding: 0 }}
            />
          </Grid>
          <Grid xs={2}>
            <TextField
              type='number'
              id='outlined-basic'
              label='amount'
              variant='outlined'
              placeholder='0'
              value={quantity}
              onChange={e => {
                const inputQuantity = parseInt(e.target.value);
                if (inputQuantity >= 0) {
                  setQuantity(inputQuantity);
                }
              }}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid xs={4}>
            <Button
              variant='outlined'
              endIcon={<LocalMallRoundedIcon />}
              onClick={handleClickButton}
              sx={{ width: '100%', height: '100%' }}
            >
              Add to list
            </Button>
          </Grid>
        </Grid>
        {showWarning && <BasicAlerts sx={{ marginTop: 10 }} />}
        <ProductList
          list={listOfProducts}
          purchaseIsDone={purchaseIsDone}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        />
        {listOfProducts.length !== 0 && (
          <Button
            variant='outlined'
            onClick={() => {
              setListOfProduct([]);
              localStorage.removeItem('list');
            }}
          >
            Remove All
          </Button>
        )}
        {listOfProducts.length !== 0 && (
          <Button
            sx={{ marginLeft: 1 }}
            variant='outlined'
            onClick={handleRemoveCompleted}
          >
            Remove completed
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
