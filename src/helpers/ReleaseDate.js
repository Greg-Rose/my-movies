class ReleaseDate {
  constructor(releaseDateResults, backup) {
    this.releaseDateResults = releaseDateResults;
    let backupDate = this.formatDate(backup) || "N/A";
    this.backup = backupDate;
  }

  getUSReleaseDateObject() {
    let rdRegion = this.releaseDateResults.find((rd) => {
      return rd.iso_3166_1 === "US";
    });

    if (rdRegion === undefined) { return null; }

    let releaseDateData = rdRegion.release_dates.find((rd) => {
      return rd.type === 3;
    });

    if (releaseDateData === undefined) { return null; }

    return releaseDateData;
  }

  getUSReleaseDate() {
    let releaseDateObject = this.getUSReleaseDateObject();

    if (releaseDateObject === null) { return this.backup; }

    return this.formatDate(releaseDateObject.release_date);
  }

  getUSRating() {
    let releaseDateObject = this.getUSReleaseDateObject();

    if (releaseDateObject === null) { return "N/A"; }

    let certification = releaseDateObject.certification;

    if (certification === null || certification.length === 0) { return "N/A"; }

    return certification;
  }

  formatDate(dateStr) {
    if (dateStr === null || dateStr.length === 0) { return null; }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(dateStr);

    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let monthName = monthNames[month];
    let day = date.getUTCDate();

    let releaseDate = `${monthName} ${day}, ${year}`;
    return releaseDate;
  }
}

export default ReleaseDate;
