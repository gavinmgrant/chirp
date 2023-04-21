export const usePermitsTransformer = (permits) => {
  return permits?.map((permit) => {
    const {
      permit_number,
      status_date,
      street_number,
      street_name,
      street_suffix,
      description,
      location,
    } = permit;

    if (!!location?.coordinates[0])
      return {
        permitNumber: permit_number,
        statusDate: status_date,
        address: `${street_number} ${street_name} ${street_suffix}`,
        description,
        lat: location?.coordinates[1],
        lng: location?.coordinates[0],
      };
  });
};
