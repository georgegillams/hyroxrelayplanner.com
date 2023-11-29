import fs from 'fs';

import loadAllData from './private/loadAllData';

import authentication from 'server-utils/common/authentication';
import appConfig from 'helpers/appConfig';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

const serverDir = 'server';
const serverContentDir = `${serverDir}/server_content`;
const dataFilePath = `${serverContentDir}/data.json`;

export default async function load(req) {
  let data;
  let user = await authentication(req);
  if (user && user.admin) {
    data = await loadAllData();
  } else {
    throw UNAUTHORISED_READ;
  }
  const dataAnnotated = {
    projectName: appConfig.projectName,
    timestamp: Date.now(),
    data,
  };
  return res => {
    if (!fs.existsSync(serverDir)) {
      fs.mkdirSync(serverDir);
    }
    if (!fs.existsSync(serverContentDir)) {
      fs.mkdirSync(serverContentDir);
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(dataAnnotated));
    res.download(dataFilePath);
  };
}
