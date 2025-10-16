import type { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography } from '@mui/material';
import { updateItemQuantity } from '../store/cart/cartSlice.ts';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  const handleUpdateQuantity = (event: any, id: number) => {
    dispatch(updateItemQuantity({ id: id, quantity: Number(event.target.value) }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Box>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
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
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CartPage;
