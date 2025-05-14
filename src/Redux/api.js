import { getAuthToken, removeAuthToken } from "@/modules/authentication";
import * as mockData from "@/mockData";

// This is a mock API implementation that returns static data
// In a real application, this would make actual API calls

// Mock delay to simulate network request
const MOCK_DELAY = 500;

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API response structure
const createResponse = (data) => ({
  data: data,
  status: 200,
  statusText: "OK",
});

// Map API endpoints to mock data
const mockEndpoints = {
  // Auth endpoints
  "/users/login": () => mockData.successResponse,
  "/users/register": () => mockData.successResponse,

  // Profile endpoints
  "/users/profile": () => ({ success: true, profileDetails: mockData.userProfileMock }),
  "/users/doula-profile": () => ({ success: true, profileDetails: mockData.doulaProfileMock }),

  // Data endpoints
  "/get-services": () => mockData.servicesMock,
  "/get-languages": () => mockData.languagesMock,
  "/get-countrys": () => mockData.countriesMock,
  "/get-age-groups": () => mockData.ageGroupsMock,

  // Search endpoints
  "/search-doula": () => mockData.doulaSearchMock,

  // Contracts endpoints
  "/contracts": () => mockData.contractsMock,

  // Contact endpoints
  "/contact/send-message": () => mockData.successResponse,
  "/contact/get-list": () => mockData.contactMock,

  // Favorites endpoints
  "/favorite/get-list": () => mockData.favoritesMock,

  // Availability endpoints
  "/availability": () => mockData.availabilityMock,
  "/availability/update": () => mockData.successResponse,
};

// Mock API functions
export const getApi = async (url) => {
  await delay(MOCK_DELAY);

  // Extract the endpoint path without query parameters
  const endpoint = url.split('?')[0];

  // Get the mock data for this endpoint
  const mockDataFn = mockEndpoints[endpoint];

  if (mockDataFn) {
    return createResponse(mockDataFn());
  }

  // Default response if endpoint not found
  console.warn(`Mock endpoint not found: ${endpoint}`);
  return createResponse(mockData.errorResponse);
};

export const postApi = async (url, apiData) => {
  await delay(MOCK_DELAY);

  // Get the mock data for this endpoint
  const mockDataFn = mockEndpoints[url];

  if (mockDataFn) {
    return createResponse(mockDataFn());
  }

  // Default response if endpoint not found
  console.warn(`Mock endpoint not found: ${url}`);
  return createResponse(mockData.successResponse);
};

export const putApi = async (url, apiData) => {
  await delay(MOCK_DELAY);
  return createResponse(mockData.successResponse);
};

export const patchApi = async (url, apiData) => {
  await delay(MOCK_DELAY);
  return createResponse(mockData.successResponse);
};

export const deleteApi = async (url) => {
  await delay(MOCK_DELAY);
  return createResponse(mockData.successResponse);
};

export const getApiData = (data) =>
  data?.data?.data ?? data?.data ?? data ?? null;

export const getApiError = (error) =>
  typeof error?.response?.data === "string"
    ? error.response?.data
    : "Something went wrong!";

export const setupInterceptors = () => {
  // No need for interceptors in mock implementation
};

export const getApiHeaders = (token = null) => {
  return {
    headers: {
      token: token,
    },
  };
};
