
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IProps {}

const HistoryCotainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  return <div>HistoryCotainer</div>;
};

export default HistoryCotainer;
