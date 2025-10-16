import type { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, IconButton, Button } from '@mui/material';
import { updateItemQuantity, deleteItem, clearCart } from '../store/cart/cartSlice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  const handleUpdateQuantity = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
  ) => {
    dispatch(updateItemQuantity({ id: id, quantity: Number(event.target.value) }));
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <Button variant="text" disabled={cartItems.length === 0} onClick={handleClearCart}>
          Clear cart
        </Button>
      </Box>

      {cartItems.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6">🛒 Your cart is empty</Typography>
        </Box>
      )}
      {cartItems.map(({ id, thumbnail, title, price, quantity }) => (
        <Box
          key={id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src={thumbnail}
              alt={title}
              style={{ width: 80, height: 80, objectFit: 'contain' }}
            />
            <Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="textSecondary">
                ${price.toFixed(2)}
              </Typography>
            </Box>
            <TextField
              type="number"
              value={quantity}
              size="small"
              onChange={(event) => handleUpdateQuantity(event, id)}
              inputProps={{ min: 1, style: { width: 60, textAlign: 'center' } }}
            />
            <IconButton color="error" onClick={() => handleDeleteItem(id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4,
          p: 2,
          borderTop: '1px solid #ccc',
        }}
      >
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
