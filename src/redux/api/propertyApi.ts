import { baseApi } from "./baseApi";
import { PropertyData, LocationData, AmenityData } from "../../../types";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<{ success: boolean; data: { results: PropertyData[]; count: number; next: string | null; previous: string | null } | PropertyData[] }, Record<string, string | number | boolean | undefined>>({
      query: (params) => {
        const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== "") {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>);

        return {
          url: "/properties/",
          method: "GET",
          params: cleanParams,
        };
      },
      providesTags: ["Property"],
    }),
    
    getProperty: builder.query<{ success: boolean; data: PropertyData }, number | string>({
      query: (id) => ({
        url: `/properties/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Property" as const, id }],
    }),

    getLocations: builder.query<{ success: boolean; data: LocationData[] }, void>({
      query: () => ({
        url: "/properties/locations/",
        method: "GET",
      }),
      providesTags: ["Location"],
    }),

    getAmenities: builder.query<{ success: boolean; data: AmenityData[] }, void>({
      query: () => ({
        url: "/properties/amenities/",
        method: "GET",
      }),
      providesTags: ["Amenity"],
    }),

    getFavorites: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => ({
        url: "/properties/favorites/",
        method: "GET",
      }),
      providesTags: ["Favorite"],
    }),

    addFavorite: builder.mutation<{ success: boolean; data: any }, { property: number }>({
      query: (body) => ({
        url: "/properties/favorites/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favorite", "Property"],
    }),

    removeFavorite: builder.mutation<{ success: boolean; message: string }, number>({
      query: (propertyId) => ({
        url: `/properties/favorites/${propertyId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite", "Property"],
    }),

    createInquiry: builder.mutation<{ success: boolean; message: string; data: any }, { property_id: number; name: string; email: string; phone?: string; message: string }>({
      query: ({ property_id, ...body }) => ({
        url: `/properties/${property_id}/inquiry/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetLocationsQuery,
  useGetAmenitiesQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useCreateInquiryMutation,
} = propertyApi;
