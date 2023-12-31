import redis from 'server-utils/common/redis';
import appConfig from 'helpers/appConfig';

const loadValues = async redisKey => {
  const values = await new Promise((resolve, reject) => {
    redis.lrange(`${appConfig.projectName}_${redisKey}`, 0, -1, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply.map(r => JSON.parse(r)));
    });
  });
  return values;
};

export default loadValues;
