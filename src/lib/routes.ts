export const appRoutes = {
  home: "/snippets" as const,

  snippets: {
    new: "/snippets/new" as const,

    item: (id: string) => ({
      details: `/snippets/${id}` as const,
      edit: `/snippets/${id}/edit` as const,
    }),
  },

  users: (username: string) => ({
    profile: `/users/${username}` as const,
    snippets: `/users/${username}/snippets` as const,
  }),

  auth: {
    login: "/login" as const,
    register: "/register" as const,
  },

  api: {
    tags: {
      search: (query: string) => `/api/tags/search?query=${query}` as const,
    },

    users: {
      checkUsername: (username: string) =>
        `/api/users/check-username?username=${username}` as const,
    },
  },
};
