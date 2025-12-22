import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IProps {}

const NotFound: React.FC<IProps> = () => {
  const { t } = useTranslation();
  return <div>NotFound</div>;
};

export default NotFound;
