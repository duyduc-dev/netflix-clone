import axios from 'axios';

// import { Config } from "config";
import { constants } from '~/utils/constants/common';
const Config: any = {
  ServerUrl: process.env.URL_BACK_END_V3 || constants.BASE_URL,
};

const processAPI = async (method: string, url: string, body?: any, header?: object | null, option?: any) => {
  const reqMethod = method || 'GET';

  let reqUrl = url;

  // eslint-disable-next-line no-useless-escape
  if (!reqUrl.match(/^(http[s]{0,1}[:][\/]{2})/i)) {
    const rurl = Config?.ServerUrl || Config?.serverUrl || '';
    reqUrl = `${rurl}/${reqUrl.startsWith('/') ? reqUrl.substr(1) : reqUrl}`;
  }

  const reqHeader: any = { ...(header || {}) };

  const rs = await axios({
    method: reqMethod,
    url: reqUrl,
    headers: reqHeader,
    data: body,
    ...(option || {}),
  });

  // console.log("RS: ", rs);
  if (option?.returnRaw) return rs;
  return rs?.data;
};

const GET = async (url: string, header?: any, option?: any) => await processAPI('GET', url, false, header, option);

const POST = async (url: string, body?: any, header?: any, option?: any) =>
  await processAPI('POST', url, body, header, option);

const PUT = async (url: string, body?: any, header?: any, option?: any) =>
  await processAPI('PUT', url, body, header, option);

const DELETE = async (url: string, body?: any, header?: any, option?: any) =>
  await processAPI('DELETE', url, body, header, option);

const PATCH = async (url: string, body?: any, header?: any, option?: any) =>
  await processAPI('PATCH', url, body, header, option);

const PURGE = async (url: string, body?: any, header?: any, option?: any) =>
  await processAPI('PURGE', url, body, header, option);

const request = {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  PURGE,
};

export default request;
