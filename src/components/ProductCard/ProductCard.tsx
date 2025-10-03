import type { ProductType } from '../../types/products.ts';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ thumbnail, title, description, price }: ProductType) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={thumbnail}
        alt={title}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" sx={{ marginTop: '8px' }}>
          ${price?.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
        <Button size="small" color="secondary">
          View Details
        </Button>
        <Button size="small" variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
