import ReleaseDate from './ReleaseDate';

describe('ReleaseDate', () => {
  let rd;

  beforeEach(() => {
    let rdResults = [
      {
        iso_3166_1: "US",
        release_dates: [
          {
            type: 3,
            release_date: "2018-01-01",
            certification: "PG-13"
          }
        ]
      },
      {}
    ];
    let backup = "2017-12-31";
    rd = new ReleaseDate(rdResults, backup);
  });

  it('getUSReleaseDateObject() should return object', () => {
    expect(rd.getUSReleaseDateObject()).toEqual({ type: 3, release_date: "2018-01-01", certification: "PG-13" });
  });

  it('getUSReleaseDateObject() should return null if no release date types === 3', () => {
    let rdResults = [
      {
        iso_3166_1: "US",
        release_dates: [
          {
            type: 2
          }
        ]
      },
      {}
    ];
    let rd = new ReleaseDate(rdResults, null);
    expect(rd.getUSReleaseDateObject()).toEqual(null);
  });

  it('getUSReleaseDate() should return formatted Date', () => {
    expect(rd.getUSReleaseDate()).toEqual("January 1, 2018");
  });

  it('getUSRating() should return certification', () => {
    expect(rd.getUSRating()).toEqual("PG-13");
  });

  it('getUSRating() should return N/A if certification is not provided', () => {
    let rdResults = [
      {
        iso_3166_1: "US",
        release_dates: [
          {
            type: 3,
            release_date: "2018-01-01",
            certification: ""
          }
        ]
      },
      {}
    ];
    let rd = new ReleaseDate(rdResults, null);
    expect(rd.getUSRating()).toEqual("N/A");
  });

  it('backup should default to N/A if not provided', () => {
    let rd = new ReleaseDate([], null);
    expect(rd.backup).toEqual("N/A");
  });
});
