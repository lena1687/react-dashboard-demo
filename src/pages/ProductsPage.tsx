import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard.tsx';
import type { ProductType } from '../types/products.ts';
import { useProductsQuery } from '../hooks/useProducts.ts';

const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useProductsQuery();
  const noProducts = products?.length === 0 && !isLoading && !isError;

  return (
    <Container>
      <Typography variant="h2">Products</Typography>

      <Grid container columns={12} spacing={2} sx={{ mt: 2 }} justifyContent="center">
        {isLoading && (
          <Grid>
            <CircularProgress />
            <Typography variant="h6" align="center">
              Loading products...
            </Typography>
          </Grid>
        )}
        {isError && (
          <Grid>
            <Typography variant="h6" color="error" align="center">
              Error loading products: {(error as Error).message}
            </Typography>
          </Grid>
        )}
        {noProducts && (
          <Grid>
            <Typography variant="h6" align="center">
              No products available.
            </Typography>
          </Grid>
        )}
        {!isLoading &&
          !isError &&
          products?.map((product: ProductType) => (
            <Grid key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
