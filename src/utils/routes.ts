export const appRoutes = {
  home: "/snippets" as const,
  snippets: {
    new: `/snippets/new` as const,
    details: (id: string) => `/snippets/${id}` as const,
    edit: (id: string) => `/snippets/${id}/edit` as const,
    editFavorite: (id: string) => `/snippets/${id}/edit/favorite` as const,
  },
  tags: {
    search: (query: string) => `/tags?query=${query}` as const,
  },
  auth: {
    login: "/login" as const,
    register: "/register" as const,
  },
  users: {
    profile: (username: string) => `/users/${username}` as const,
    checkUsername: (username: string) => `/api/users/check-username?username=${username}` as const,
  },
};
