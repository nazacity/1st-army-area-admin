import amphures from 'constants/province/thai_amphures';
import tambons from 'constants/province/thai_tambons';
import { useMemo } from 'react';

export const useAmphureApi = (provinceId: number) => {
  const AmphureLists = useMemo(() => {
    if (provinceId) {
      return amphures.filter((item) => item.province_id === provinceId);
    } else {
      return [];
    }
  }, [provinceId]);

  return { AmphureLists };
};

export const useTambonsApi = (amphureId: number) => {
  const TambonLists = useMemo(() => {
    if (amphureId) {
      return tambons.filter((item) => item.amphure_id === amphureId);
    } else {
      return [];
    }
  }, [amphureId]);

  return { TambonLists };
};
