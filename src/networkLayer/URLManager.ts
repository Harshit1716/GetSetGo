import URLService from './URLServices';

export default class URLManager {
  getFlightData() {
    let urlService = new URLService();
    let urlPath = 'https://api.npoint.io/378e02e8e732bb1ac55b';
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, 'GET')
      .then((res: any) => res);
  }
}
