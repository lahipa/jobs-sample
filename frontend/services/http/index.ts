import requestHttp from "./network";

export const API_BACKEND = requestHttp(
  "http://localhost:5500/api/v1",
  "other",
  "apikey",
)

export const API_GOOGLEMAP = requestHttp(
  "https://maps.googleapis.com/maps/api/",
  "other",
  "apikey",
);
