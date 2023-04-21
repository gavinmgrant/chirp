export const permitsTransformer = (permits) => {
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

    return {
      permitNumber: permit_number,
      statusDate: status_date,
      address: `${street_number} ${street_name} ${street_suffix}`,
      description,
      lat: location?.coordinates[0],
      lng: location?.coordinates[1],
    };
  });
};
