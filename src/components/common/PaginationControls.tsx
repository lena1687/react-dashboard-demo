import { Box, Pagination } from '@mui/material';
import * as React from 'react';

type PaginationControlsProps = {
  totalPages: number;
  page: number;
  onChangePage?: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationControls = ({ totalPages, page, onChangePage }: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination count={totalPages} page={page} onChange={onChangePage} color="primary" />
    </Box>
  );
};

export default PaginationControls;
