const express = require('express');

function createRouter(db) {
  const router = express.Router();
  router.get('/massage', function (req, res, next) {
    db.query(
      'SELECT * FROM massage',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });
  router.get('/massage/:massage', function (req, res, next) {
    db.query(
      'SELECT * FROM massage WHERE massage=?',
      [req.params.massage,],
      (error, results) => {
        if (error) {
          console.log(results);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status:'ok'});
        }
      }
    );
  });

  router.post('/massage', (req, res, next) => {
    db.query(
      'INSERT INTO massage (massage) VALUES (?)',
      [req.body.massage],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/massage/:massage', function (req, res, next) {
    db.query(
      'DELETE FROM massage WHERE massage=?',
      [req.body.massage],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
