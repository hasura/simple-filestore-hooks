var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));

/* This webhook expects 2 query parameters:
 * file_id, file_op
 *
 * This webhook allows any logged-in user (via the role: user) to upload,
 * and any user (including anonymous) to download
 *
 */
app.get('/public-read', function (req, res) {
  const fileId = req.query.file_id;
  const fileOp = req.query.file_op;

  const role = req.get('x-hasura-role');
  var isUser = (role === 'user');

  const isWriteOp = (['create', 'delete'].indexOf(fileOp) >= 0);

  if (fileId && fileOp) {
    if (fileOp === 'create') {
      if (isUser) {
        res.send(JSON.stringify({message: 'allow'}));
      } else {
        res.status(403).send(JSON.stringify({message: 'deny'}));
      }
    } else if (fileOp === 'delete') {
      res.status(403).send(JSON.stringify({message: 'deny'}));
    } else {
      res.send(JSON.stringify({message: 'allow'}));
    }
  } else {
    res.status(400).send(JSON.stringify({message: 'Missing query params file_id and/or file_op'}));
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
