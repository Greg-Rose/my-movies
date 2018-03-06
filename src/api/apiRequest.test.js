import ApiRequest from './apiRequest';
import authApi from './authApi';

describe('ApiRequest', () => {
  beforeEach(() => {
    const authApiGetTokenSpy = jest.spyOn(authApi, 'getToken')
      .mockImplementation(() => {
        return "token";
      });
  });

  it("get() makes get request via fetch", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
          let response = new Promise((resolve, reject) => {
            resolve({
              ok: true,
              json: function() {
                return { data: 'test' };
              }
            });
          });

          return response;
      });

    let called = false;
    let returnedData;

    let get = await ApiRequest.get("/test", (response) => {
      returnedData = response;
      called = true;
    });

    expect(called).toEqual(true);
    expect(returnedData.data).toEqual("test");
  });

  it("post() makes post request via fetch", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
          let response = new Promise((resolve, reject) => {
            resolve({
              ok: true,
              json: function() {
                return { data: 'movie added', };
              }
            });
          });

          return response;
      });

    let called = false;
    let returnedData;

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let data = {movie: "test"};

    let post = await ApiRequest.post("/test", data, (response) => {
      returnedData = response;
      called = true;
    }, headers);

    expect(called).toEqual(true);
    expect(returnedData.data).toEqual("movie added");
  });

  it("put() makes put request via fetch", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
          let response = new Promise((resolve, reject) => {
            resolve({
              ok: true,
              json: function() {
                return { data: 'movie updated', };
              }
            });
          });

          return response;
      });

    let called = false;
    let returnedData;

    let data = {movie: "test"};

    let put = await ApiRequest.put("/test", data, (response) => {
      returnedData = response;
      called = true;
    });

    expect(called).toEqual(true);
    expect(returnedData.data).toEqual("movie updated");
  });

  it("delete() makes delete request via fetch", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
          let response = new Promise((resolve, reject) => {
            resolve({
              ok: true,
              json: function() {
                return { data: 'movie deleted', };
              }
            });
          });

          return response;
      });

    let called = false;
    let returnedData;

    let deleteRequest = await ApiRequest.delete("/test/1", (response) => {
      returnedData = response;
      called = true;
    });

    expect(called).toEqual(true);
    expect(returnedData.data).toEqual("movie deleted");
  });

  it("request() throws error if reposonse if not ok", async () => {
    global.console = {error: jest.fn()};

    global.fetch = jest.fn().mockImplementation(() => {
          let response = new Promise((resolve, reject) => {
            resolve({
              ok: false,
              status: 404,
              statusText: "Failed"
            });
          });

          return response;
      });

    let called = false;

    let get = await ApiRequest.request("/test", "get", null,  (response) => {
      called = true;
    });

    expect(called).toEqual(false);
    expect(console.error).toBeCalled();
  });
});
