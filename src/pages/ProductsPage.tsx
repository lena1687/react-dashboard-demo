import { CircularProgress, Container, Grid, Pagination, Typography, Box } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard.tsx';
import ProductFilters from '../components/ProductCard/ProductFilters.tsx';
import type { ProductType } from '../types/products.ts';
import { useCategoriesQuery, useProductsQuery } from '../hooks/useProducts.ts';
import { useSearchParams, useParams } from 'react-router-dom';
import * as React from 'react';
import { useEffect } from 'react';

const ProductsPage = () => {
  const [urlParams, setUrlParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(urlParams.toString());

    if (!params.has('page')) params.set('page', '1');
    if (!params.has('limit')) params.set('limit', '12');
    setUrlParams(params);
  }, []);

  const page = parseInt(urlParams.get('page') || '1', 10);
  const limit = parseInt(urlParams.get('limit') || '12', 10);
  const { category } = useParams<{ category?: string }>();
  const search = urlParams.get('q') || '';

  const {
    data,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
  } = useProductsQuery({
    page,
    limit,
    search,
    category,
  });

  const { products, total } = data || {};

  const categoriesQuery = useCategoriesQuery();

  const totalPages = products ? Math.ceil((total || 0) / limit) : 0;
  const noProducts = products?.length === 0 && !isLoadingProducts && !isProductsError;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setUrlParams({ page: value.toString(), limit: limit.toString() });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography variant="h2">Products</Typography>

      <ProductFilters categoriesData={categoriesQuery} category={category || ''} />

      {isLoadingProducts && (
        <Grid container direction="column" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
          <Typography variant="h6" align="center" sx={{ mt: 3 }}>
            Loading products...
          </Typography>
        </Grid>
      )}
      {isProductsError && (
        <Box>
          <Typography variant="h6" color="error" align="center">
            Error loading products: {(productsError as Error).message}
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
      {!isLoadingProducts && !isProductsError && (
        <Grid container spacing={2} justifyContent="center">
          {products?.map((product: ProductType) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard {...product} />
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
