const request = require('request');
const Rx = require('@reactivex/rxjs');
const { sortBy } = require('../models/general');
let url = 'https://itunes.apple.com/search';

module.exports =  {
  search: (req, res) => Rx.Observable.create((observer) => {
      return request(
        url + req.url,
        {
          method: 'GET',
          json: true,
        },
        (error, response, body) => {
          if (error) {
            observer.error(error);
          } else if (response.statusCode >= 500) {
            observer.error(response);
          } else if (response.statusCode === 404) {
            observer.next(null);
          } else if (response.statusCode >= 400 && response.statusCode < 500) {
            observer.next({
              statusCode: body.statusCode,
              code: body.code,
            });
          } else {
            observer.next(body);
          }

          observer.complete();
        },
      );
    })
    .subscribe(
      response => res.send(sortBy(response.results, 'kind')),
      err => res.status(500).send(err.message),
    )
};
