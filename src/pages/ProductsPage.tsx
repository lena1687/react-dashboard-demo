import { CircularProgress, Container, Grid, Pagination, Typography, Box } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard.tsx';
import type { ProductsQueryResultType, ProductType } from '../types/products.ts';
import { useProductsQuery } from '../hooks/useProducts.ts';
import { useSearchParams } from 'react-router-dom';
import * as React from 'react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);

  const { data, isLoading, isError, error } = useProductsQuery(
    page,
    limit,
  ) as ProductsQueryResultType;

  const { products, total } = data || {};
  const totalPages = products ? Math.ceil(total || 0 / limit) : 0;
  const noProducts = products?.length === 0 && !isLoading && !isError;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString(), limit: limit.toString() });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography variant="h2">Products</Typography>

      {isLoading && (
        <Grid container direction="column" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
          <Typography variant="h6" align="center" sx={{ mt: 3 }}>
            Loading products...
          </Typography>
        </Grid>
      )}
      {isError && (
        <Box>
          <Typography variant="h6" color="error" align="center">
            Error loading products: {(error as Error).message}
          </Typography>
        </Box>
      )}
      {noProducts && (
        <Box>
          <Typography variant="h6" align="center">
            No products available.
          </Typography>
        </Box>
      )}
      {!isLoading && !isError && (
        <Grid container spacing={2} justifyContent="center">
          {products?.map((product: ProductType) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Container>
  );
};

export default ProductsPage;
