import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { CategoryApiResponseType } from '../../types/products.ts';
import type { UseQueryResult } from '@tanstack/react-query';

type ProductFiltersProps = {
  initialParams: Record<string, string>;
  categoriesData: UseQueryResult<CategoryApiResponseType[], Error>;
  category: string | undefined;
};

const ProductFilters = ({ initialParams, categoriesData, category }: ProductFiltersProps) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(initialParams);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = categoriesData;

  const categoryOptions = Array.isArray(categories) ? categories : [];
  const validCategory = categoryOptions.some((cat) => cat.slug === category) ? category : '';

  const handleCategory = (selectedCategory: string) => {
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

  return (
    <FormControl sx={{ my: 3, minWidth: 200 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={isLoadingCategories || isCategoriesError ? '' : validCategory || ''}
        onChange={(e) => handleCategory(e.target.value)}
        disabled={isLoadingCategories || isCategoriesError}
        autoWidth
        label="Category"
      >
        {isCategoriesError && (
          <MenuItem value="" disabled>
            Error loading categories: {(categoriesError as Error).message}
          </MenuItem>
        )}
        {isLoadingCategories && (
          <MenuItem value="" disabled>
            Loading categories...
          </MenuItem>
        )}
        {!isLoadingCategories &&
          !isCategoriesError && [
            <MenuItem value="">All Categories</MenuItem>,
            ...categoryOptions.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            )),
          ]}
      </Select>
    </FormControl>
  );
};

export default ProductFilters;
