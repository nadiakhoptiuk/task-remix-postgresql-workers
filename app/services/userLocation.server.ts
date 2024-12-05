import { Role } from '@prisma/client';

import { NAVLINKS } from '~/constants/constants';
import { EditorLocationType } from '~/types/common.types';

export const filterLocationByAccess = (
  locations: EditorLocationType[],
  userRole: Role,
): EditorLocationType[] | null => {
  const availableLocations = locations.reduce<EditorLocationType[]>(
    (acc, location) => {
      const neededRouteData = NAVLINKS.find(
        ({ route }) => route === location.user.location?.location,
      );

      if (!neededRouteData) {
        return acc;
      }

      if (neededRouteData.roles.includes(userRole)) {
        acc.push(location);
      }
      return acc;
    },
    [],
  );

  return availableLocations.length > 0 ? availableLocations : null;
};
