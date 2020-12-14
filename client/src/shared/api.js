import axios from "axios";

import { apiUrl } from "./constants";

const ApiErrorCode = {
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  INVALID_AUTH: "INVALID_AUTH",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR"
};

// API CONFIGURATION

const API_URL = apiUrl;

class ApiClient {
  axiosObject;

  constructor() {
    this.axiosObject = axios.create({
      baseURL: API_URL,
      timeout: 15000
    });
  }

  async get(url) {
    const token = window.localStorage.getItem("twitter_helpdesk_token");
    try {
      const resp = await this.axiosObject.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      });
      return resp.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async post(url, data = {}) {
    const token = window.localStorage.getItem("twitter_helpdesk_token");
    try {
      const resp = await this.axiosObject.post(url, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      });
      return resp;
    } catch (err) {
      const { status, data: errorData } = err.response;
      if (
        status === 400 &&
        errorData.errorCode === ApiErrorCode.VALIDATION_ERROR
      ) {
        return {
          s: false,
          errorCode: errorData.errorCode,
          message: errorData.message.message
        };
      }
      throw new Error(err);
    }
  }
}

export default new ApiClient();
