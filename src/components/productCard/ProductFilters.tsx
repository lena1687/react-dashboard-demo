import { Grid, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import type {
  CategoryApiResponseType,
  CategoryQueryResultType,
  SortProductOption,
} from '../../types/products.ts';
import type { UseQueryResult } from '@tanstack/react-query';
import SelectControls from '../common/SelectControls.tsx';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import type { sortOrder } from '../../types/common.ts';

type ProductFiltersProps = {
  initialParams: Record<string, string>;
  categoriesData: UseQueryResult<CategoryApiResponseType[], Error>;
  category: string | undefined;
  search: string | undefined;
  sortBy?: string | undefined;
  order?: sortOrder | undefined;
};

const ProductFilters = ({
  initialParams,
  categoriesData,
  category,
  search,
  sortBy,
  order,
}: ProductFiltersProps) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  }: CategoryQueryResultType = categoriesData;

  const categoryOptions = Array.isArray(categories)
    ? categories.map(({ slug, name }: CategoryApiResponseType) => ({ id: slug, name: name }))
    : [];
  const validCategory = categoryOptions.some((cat) => cat.id === category) ? category || '' : '';

  const handleCategoryChange = (selectedCategory: string) => {
    handleSearchClear();
    if (selectedCategory) {
      navigate({
        pathname: `/products/category/${selectedCategory}`,
        search: params.toString(),
      });
    } else {
      navigate({
        pathname: '/products',
        search: `?${params.toString()}`,
      });
    }
  };

  const sortOptions: SortProductOption[] = [
    { id: 'new', name: 'Sort by new arrivals', sortBy: 'meta.createdAt', order: 'desc' },
    { id: 'rating', name: 'Sort by customer rating', sortBy: 'rating', order: 'desc' },
    { id: 'price-asc', name: 'Sort by  price: low to high', sortBy: 'price', order: 'asc' },
    { id: 'price-desc', name: 'Sort by price: high to low', sortBy: 'price', order: 'desc' },
    {
      id: 'discount',
      name: 'Sort by discount: high to low',
      sortBy: 'discountPercentage',
      order: 'desc',
    },
  ];

  const currentSortOption =
    sortBy && order
      ? sortOptions.find((opt) => opt.sortBy === sortBy && opt.order === order)?.id
      : '';

  const handleSortByChange = (selectedSortBy: string) => {
    const sortOption = sortOptions.find((opt) => opt.id === selectedSortBy);

    if (sortOption) {
      params.delete('page');
      params.delete('limit');
      params.set('sortBy', sortOption.sortBy || '');
      params.set('order', sortOption.order || '');
      params.set('page', initialParams.page);
      params.set('limit', initialParams.limit);

      navigate({
        pathname: category ? `/products/category/${category}` : '/products',
        search: params.toString(),
      });
    } else {
      params.delete('sortBy');
      params.delete('order');
      navigate({
        pathname: category ? `/products/category/${category}` : '/products',
        search: `?${params.toString()}`,
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    if (newSearch) {
      params.set('q', newSearch);
      navigate({
        pathname: `/products/search`,
        search: params.toString(),
      });
    } else {
      params.delete('q');
      navigate({
        pathname: '/products',
        search: `?${params.toString()}`,
      });
    }
  };

  const handleSearchClear = () => {
    params.delete('q');
    navigate({
      pathname: '/products',
      search: `?${params.toString()}`,
    });
  };

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
      <Box display="flex" alignItems="center">
        <Box sx={{ mr: 2 }}>
          <SelectControls
            label="Sort By"
            options={sortOptions}
            value={currentSortOption ?? ''}
            onChangeValue={handleSortByChange}
          />
        </Box>

        <SelectControls
          label="Category"
          options={categoryOptions}
          value={validCategory}
          onChangeValue={handleCategoryChange}
          isLoading={isLoadingCategories}
          isError={isCategoriesError}
          error={categoriesError}
        />
      </Box>
      <TextField
        label="Search products"
        sx={{ minWidth: 350 }}
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClear} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default ProductFilters;
