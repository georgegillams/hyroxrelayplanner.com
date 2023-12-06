import appConfig from './appConfig';

const redirects = [
  {
    from: '/codebase',
    to: appConfig.githubRepoUrl,
  },
];

export default redirects;
