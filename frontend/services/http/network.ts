import axios from "axios";

/**
 *
 * @param {*} url
 * @param {*} api (default, other)
 * @param {*} authtype (basic, apikey, bearer)
 * @param {*} authdata
 *
 * Create axios instance
 * Create request interceptor
 * Create response interceptor
 *
 * Header Misc: {
 *    Content-Type: "application/vnd.api+json; charset=utf-8; application/x-www-form-urlencoded",
 *    Accept: "application/json",
 * }
 *
 */
const requestHttp = (
  url: string,
  api: "default" | "other",
  authtype: "basic" | "apikey" | "bearer",
  authdata?: any,
) => {
  const instance = axios.create();

  // Request Interceptor
  instance.interceptors.request.use(
    async (config) => {
      const http = config;
      const prevHeaders = http.headers;

      http.baseURL = url;
      http.timeout = 20000;

      if (api === "default") {
        http.headers = {
          ...prevHeaders,
          "Content-Type": prevHeaders!["Content-Type"] ? prevHeaders!["Content-Type"] : "application/json; charset=utf-8",
          Accept: "application/json",
        };
      }

      if (api === "other") {
        http.headers = {
          ...prevHeaders,
          "Content-Type": prevHeaders!["Content-Type"] ? prevHeaders!["Content-Type"] : "application/json; charset=utf-8",
          Accept: "application/json",
        };
      }

      if (authtype === "basic") {
        // http.auth = {
        //   username: authdata?.user!,
        //   password: authdata?.pass!,
        // };

        http.headers!.Authorization = `Basic ${authdata}`;
      }

      // if (authtype === "bearer") {
      //   const accessToken = await getAccessToken();
      //   const refreshToken = await getRefreshToken();

      //   http.headers["Authorization"] = `Bearer ${accessToken}`;
      //   http.headers["X-App-Rte"] = refreshToken;
      // }

      return http;
    },
    (err) => {
      Promise.reject(err);
    },
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (res) => {
      process.env.NEXT_PUBLIC_ENV_DEBUG === "yes" && console.log("[RESPONSE_STATUS]", res.status);
      process.env.NEXT_PUBLIC_ENV_DEBUG === "yes" && console.log("[RESPONSE_HEADERS]", res.headers);
      process.env.NEXT_PUBLIC_ENV_DEBUG === "yes" && console.log("[RESPONSE_CONFIG]", res.config);

      return res;
    },
    async (err) => {
      process.env.NEXT_PUBLIC_ENV_DEBUG === "yes" && console.log("[ERR_RESPONSE]", err.response);

      // Retry Request
      const originalReq = err.config;

      if (!originalReq._retry) {
        originalReq._retry = true;

        return instance(originalReq);
      }

      // Retry Request
      // if (authtype === "bearer") {
      //   const originalReq = err.config;
      //   const data = err.response.data;

      //   if (err.response.status === 403 && data.errors.title.includes("403200") && !originalReq._retry) {
      //     originalReq._retry = true;

      //     await setClientToken(
      //       data.data.refresh_token.exp,
      //       data.data.refresh_token.token,
      //       data.data.access_token.token
      //     );

      //     return instance(originalReq);
      //   } else if (err.response.status === 403 && data.errors.detail.includes("refresh token has expired")) {
      //     await remClientToken()

      //     window.location.replace("/");
      //   }
      // }

      return Promise.reject(err);
    },
  );

  return instance;
};

export default requestHttp;
