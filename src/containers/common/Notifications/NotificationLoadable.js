import Loadable from 'react-loadable';

const Loading = () => null;

const NotificationLoadable = Loadable({
  loader: () => import('@george-gillams/components/Notification/Notification.js'),
  loading: Loading,
});

export default NotificationLoadable;
