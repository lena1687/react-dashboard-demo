import { CircularProgress, Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../components/productCard/ProductCard.tsx';
import ProductFilters from '../components/productCard/ProductFilters.tsx';
import PaginationControls from '../components/common/PaginationControls.tsx';
import type { ProductsQueryResultType, ProductType } from '../types/products.ts';
import { useCategoriesQuery, useProductsQuery } from '../hooks/useProducts.ts';
import { useSearchParams, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as React from 'react';
import type { sortOrder } from '../types/common.ts';

const ProductsPage = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const initialPageValue = '1';
  const initialLimitValue = '12';

  const page = parseInt(urlParams.get('page') || initialPageValue, 10);
  const limit = parseInt(urlParams.get('limit') || initialLimitValue, 10);
  const { category } = useParams<{ category?: string }>();
  const search = urlParams.get('q') || '';
  const sortBy = urlParams.get('sortBy') || undefined;
  const order = (urlParams.get('order') as sortOrder) || undefined;

  useEffect(() => {
    const params = new URLSearchParams(urlParams.toString());

    if (!params.has('page')) params.set('page', initialPageValue);
    if (!params.has('limit')) params.set('limit', initialLimitValue);
    setUrlParams(params);
  }, []);

  const {
    data,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
  }: ProductsQueryResultType = useProductsQuery({
    page,
    limit,
    search,
    category,
    sortBy,
    order,
  });

  const { products, total } = data || {};

  const categoriesQuery = useCategoriesQuery();

  const totalPages = products ? Math.ceil((total || 0) / limit) : 0;
  const noProducts = products?.length === 0 && !isLoadingProducts && !isProductsError;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setUrlParams({
      ...Object.fromEntries(urlParams.entries()),
      page: value.toString(),
      limit: limit.toString(),
    });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography variant="h2">Products</Typography>

      <ProductFilters
        initialParams={{
          page: initialPageValue,
          limit: initialLimitValue,
        }}
        categoriesData={categoriesQuery}
        category={category || ''}
        search={search || ''}
        sortBy={sortBy}
        order={order as sortOrder | undefined}
      />

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
      <PaginationControls totalPages={totalPages} page={page} onChangePage={handlePageChange} />
    </Container>
  );
};

export default ProductsPage;
