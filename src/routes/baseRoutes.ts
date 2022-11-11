const pollsRoute = 'poll';

export const baseRoutes = {
  index: '/',
  createPoll: `/${pollsRoute}/create`,
  editPoll: `/${pollsRoute}/:id/edit`,
  pollById: `/${pollsRoute}/:id`,
  profile: '/profile',
  login: '/login',
  register: '/register',
  users: '/users',
};
