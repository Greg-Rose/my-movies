const getUSReleaseDate = (releaseDateResults, backup) => {
  let backupRD = backup || "Unknown";

  let rdRegion = releaseDateResults.find((rd) => {
    return rd.iso_3166_1 === "US";
  });

  if (rdRegion === undefined) { return backupRD; }

  let releaseDateData = rdRegion.release_dates.find((rd) => {
    return rd.type === 3;
  });

  if (releaseDateData === undefined) { return backupRD; }
  
  let date = new Date(releaseDateData.release_date);
  let releaseDate = `${date.getUTCFullYear()}-${('0' + (date.getUTCMonth()+1)).slice(-2)}-${('0' + date.getUTCDate()).slice(-2)}`;
  return releaseDate;
};

export default getUSReleaseDate;
