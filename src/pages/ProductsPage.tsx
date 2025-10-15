import { CircularProgress, Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../components/productCard/ProductCard.tsx';
import ProductFilters from '../components/productCard/ProductFilters.tsx';
import PaginationControls from '../components/common/PaginationControls.tsx';
import type { ProductsQueryResultType, ProductType } from '../types/products.ts';
import { useCategoriesQuery, useProductsQuery } from '../hooks/useProducts.ts';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as React from 'react';
import type { sortOrder } from '../types/common.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { addItem } from '../store/cart/cartSlice.ts';
import IconTextButton from '../components/common/IconTextButtonControls.tsx';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductsPage = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const handleAddToCart = (product: ProductType) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <IconTextButton
          icon={<ShoppingCartIcon sx={{ fontSize: '1.8rem' }} />}
          text="Cart"
          badgeContent={totalQuantity}
          size="large"
          onClick={() => navigate('/cart')}
          sx={{
            border: '1px solid',
            borderColor: 'grey.400',
            borderRadius: 2,
            px: 2.4,
            py: 1.4,
            '&:hover': {
              borderColor: 'grey.700',
            },
          }}
        />
      </Box>

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
              <ProductCard product={product} addToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
      <PaginationControls totalPages={totalPages} page={page} onChangePage={handlePageChange} />
    </Container>
  );
};

export default ProductsPage;
