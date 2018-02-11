let formatDate = (dateStr) => {
  if (dateStr === null || dateStr.length === 0) { return null; }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date(dateStr);

  let year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  let monthName = monthNames[month];
  let day = date.getUTCDate();

  let releaseDate = `${monthName} ${day}, ${year}`;
  return releaseDate;
};

const getUSReleaseDate = (releaseDateResults, backup) => {
  let backupRD = formatDate(backup) || "Unknown";

  let rdRegion = releaseDateResults.find((rd) => {
    return rd.iso_3166_1 === "US";
  });

  if (rdRegion === undefined) { return backupRD; }

  let releaseDateData = rdRegion.release_dates.find((rd) => {
    return rd.type === 3;
  });

  if (releaseDateData === undefined) { return backupRD; }

  return formatDate(releaseDateData.release_date);
};

export default getUSReleaseDate;
