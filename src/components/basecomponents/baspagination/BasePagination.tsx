import React from 'react';
import { Pagination } from '@mui/material';

interface IProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const BasePagination: React.FC<IProps> = ({ page, count, onChange }) => {
  return (
    <Pagination
      color="primary"
      count={count}
      page={page}
      onChange={onChange}
      variant="outlined"
      shape="rounded"
    />
  );
};

export default BasePagination;
