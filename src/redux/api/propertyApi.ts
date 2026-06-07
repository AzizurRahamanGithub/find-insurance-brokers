import { baseApi } from "./baseApi";
import { PropertyData, SubCategoryData, PaginationData } from "../../types";

type PropertiesResponse = {
  success: boolean;
  data: { results: PropertyData[]; pagination: PaginationData };
};

type SubCategoriesResponse = {
  success: boolean;
  data: { results: SubCategoryData[]; pagination: PaginationData };
};

type PropertyResponse = {
  success: boolean;
  data: PropertyData;
};

type QueryParams = Record<string, string | number | boolean | undefined>;

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<PropertiesResponse, QueryParams>({
      query: (params) => {
        const cleanParams = Object.entries(params).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== "") {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>
        );
        return {
          url: "/properties/",
          method: "GET",
          params: cleanParams,
        };
      },
      providesTags: ["Property"],
    }),

    getProperty: builder.query<PropertyResponse, number | string>({
      query: (id) => ({
        url: `/properties/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Property" as const, id }],
    }),

    getSubCategories: builder.query<SubCategoriesResponse, void>({
      query: () => ({
        url: "/properties/subcategories/",
        method: "GET",
      }),
      providesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetSubCategoriesQuery,
} = propertyApi;