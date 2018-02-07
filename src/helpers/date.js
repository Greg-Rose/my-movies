const getUSReleaseDate = (releaseDateResults) => {
  let rdRegion = releaseDateResults.find((rd) => {
    return rd.iso_3166_1 === "US";
  });
  let releaseDateData = rdRegion.release_dates.find((rd) => {
    return rd.type === 3;
  });
  let date = new Date(releaseDateData.release_date);
  let releaseDate = `${date.getUTCFullYear()}-${('0' + (date.getUTCMonth()+1)).slice(-2)}-${('0' + date.getUTCDate()).slice(-2)}`;
  return releaseDate;
};

export default getUSReleaseDate;
