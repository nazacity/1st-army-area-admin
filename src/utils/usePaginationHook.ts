import { useState } from 'react';

const usePaginationHook = <IData>() => {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData[]>([]);

  return { page, setPage, total, setTotal, loading, setLoading, data, setData };
};

export default usePaginationHook;
