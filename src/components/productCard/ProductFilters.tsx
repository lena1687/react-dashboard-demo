import { Grid, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import type { CategoryApiResponseType } from '../../types/products.ts';
import type { UseQueryResult } from '@tanstack/react-query';
import SelectControls from '../common/SelectControls.tsx';
import TextField from '@mui/material/TextField';
import * as React from 'react';

type ProductFiltersProps = {
  initialParams: Record<string, string>;
  categoriesData: UseQueryResult<CategoryApiResponseType[], Error>;
  category: string | undefined;
  search: string | undefined;
};

const ProductFilters = ({
  initialParams,
  categoriesData,
  category,
  search,
}: ProductFiltersProps) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(initialParams);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = categoriesData;

  const categoryOptions = Array.isArray(categories)
    ? categories.map(({ slug, name }) => ({ id: slug, name: name }))
    : [];
  const validCategory = categoryOptions.some((cat) => cat.id === category) ? category || '' : '';

  const handleCategoryChange = (selectedCategory: string) => {
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

  const handleClear = () => {
    params.delete('q');
    navigate({
      pathname: '/products',
      search: `?${params.toString()}`,
    });
  };

  return (
    <Grid container spacing={2} alignItems="center" sx={{ my: 3 }}>
      <TextField
        label="Search products"
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
              <IconButton onClick={handleClear} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <SelectControls
        label="Category"
        options={categoryOptions}
        value={validCategory}
        onChangeValue={handleCategoryChange}
        isLoading={isLoadingCategories}
        isError={isCategoriesError}
        error={categoriesError}
      />
    </Grid>
  );
};

export default ProductFilters;
