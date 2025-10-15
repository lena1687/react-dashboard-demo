import type { ProductType } from '../../types/products.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Rating,
} from '@mui/material';

type ProductCardProps = {
  product: ProductType;
  addToCart: (product: ProductType) => void;
};

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    thumbnail,
    meta: { createdAt } = { createdAt: '' },
  } = product;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={thumbnail}
          alt={title}
          sx={{ objectFit: 'contain', pt: '16px' }}
        />
        <Chip
          label={`${discountPercentage.toFixed()}% OFF`}
          color="success"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontWeight: 500,
            zIndex: 1,
          }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Rating name="product-rating" value={rating ?? 0} precision={0.1} readOnly size="small" />
        <Typography variant="body2" color="text.secondary" noWrap sx={{ marginTop: '6px' }}>
          {description}
        </Typography>
        <Typography
          variant="caption"
          color="primary"
          sx={{ marginTop: '4px', fontWeight: 'bold', letterSpacing: 0.2 }}
        >
          Added: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" sx={{ marginTop: '8px' }}>
          ${price?.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
        <Button size="small" color="secondary">
          View Details
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
