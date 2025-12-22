import { useMemo } from 'react';
import {
  ClinicAdministorPermissionSectionName,
  ClinicAdministorPermissionSectionType,
} from 'models/permission.model';
import { useAppSelector } from 'store';

const useProtectRouteHook = ({
  permission,
  type,
}: {
  permission: ClinicAdministorPermissionSectionName;
  type: ClinicAdministorPermissionSectionType;
}) => {
  const user = useAppSelector((state) => state.user.user);

  const enabled = useMemo(() => {
    if (user) {
      if (
        user.permission.section.findIndex(
          (item) => item.section === permission && item.type >= type
        ) > -1
      ) {
        return true;
      }

      return false;
    }
  }, [permission, type]);

  return enabled;
};

export default useProtectRouteHook;
