import authApi from './authApi';
import ApiRequest from './apiRequest';
import decode from 'jwt-decode';
jest.mock('jwt-decode');

describe('AuthApi', () => {
  let ApiRequestSpy;

  beforeEach(() => {
    ApiRequestSpy = jest.spyOn(ApiRequest, 'post')
      .mockImplementation(() => {
        return true;
      });

    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }

      removeItem(key) {
        delete this.store[key];
      }
    }

    global.localStorage = new LocalStorageMock();
  });

  it("signIn calls ApiRequest.post", async () => {
    authApi.signIn();
    expect(ApiRequestSpy).toHaveBeenCalled();
  });

  it("signUp calls ApiRequest.post", async () => {
    authApi.signUp();
    expect(ApiRequestSpy).toHaveBeenCalled();
  });

  it("userSignedIn returns true if user is signed in", () => {
    global.localStorage.setItem("authToken", "test");
    decode.mockImplementation(() => {
      return {exp: (new Date() / 1000 + 10000)};
    });
    let answer = authApi.userSignedIn();
    expect(answer).toEqual(true);
  });

  it("userSignedIn returns false if user is not signed in", () => {
    let answer = authApi.userSignedIn();
    expect(answer).toEqual(false);
  });

  it("isTokenExpired returns true if token is expired", () => {
    decode.mockImplementation(() => {
      return {exp: (new Date() / 1000 - 10000)};
    });

    let answer = authApi.isTokenExpired("fake token");
    expect(answer).toEqual(true);
  });

  it("isTokenExpired returns false if token is not expired", () => {
    decode.mockImplementation(() => {
      return {exp: (new Date() / 1000 + 10000)};
    });

    let answer = authApi.isTokenExpired("fake token");
    expect(answer).toEqual(false);
  });

  it("isTokenExpired returns true on error", () => {
    decode.mockImplementation(() => {
      throw new Error;
    });

    let answer = authApi.isTokenExpired("fake token");
    expect(answer).toEqual(true);
  });

  it("setToken sets token in localStorage", () => {
    authApi.setToken({auth_token: "new token"});
    expect(global.localStorage.getItem('authToken')).toEqual("new token");
  });

  it("getToken gets token from localStorage", () => {
    global.localStorage.setItem("authToken", "test");
    let token = authApi.getToken();
    expect(token).toEqual("test");
  });

  it("signOut deletes token from localStorage", () => {
    global.localStorage.setItem("authToken", "test");
    authApi.signOut();
    expect(global.localStorage.getItem('authToken')).toEqual(null);
  });
});
