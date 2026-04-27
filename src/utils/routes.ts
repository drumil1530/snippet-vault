export const appRoutes = {
  home: "/" as const,
  snippets: {
    list: "/snippets" as const,
    new: `/snippets/new` as const,
    details: (id: string) => `/snippets/${id}` as const,
    edit: (id: string) => `/snippets/edit/${id}` as const,
  },
};
