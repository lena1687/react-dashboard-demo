import { useNavigate } from 'react-router-dom';
import type { CategoryApiResponseType } from '../../types/products.ts';
import type { UseQueryResult } from '@tanstack/react-query';
import SelectControls from '../common/SelectControls.tsx';

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

  const categoryOptions = Array.isArray(categories)
    ? categories.map(({ slug, name }) => ({ id: slug, name: name }))
    : [];
  const validCategory = categoryOptions.some((cat) => cat.id === category) ? category || '' : '';

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
    <SelectControls
      label="Category"
      options={categoryOptions}
      value={validCategory}
      onChangeValue={handleCategory}
      isLoading={isLoadingCategories}
      isError={isCategoriesError}
      error={categoriesError}
    />
  );
};

export default ProductFilters;
