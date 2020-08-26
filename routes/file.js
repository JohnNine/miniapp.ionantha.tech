var express = require('express');
var router = express.Router();
var fs = require("fs");
const { download } = require('../models/download')
const { getToken } = require('../utils/wechat')
var amrToMp3 = require('amrToMp3')

router.get("/file_upload", async (req, res) => {
  const { media_id } = req.query
  const access_token = await getToken()
  console.log(access_token)
  const data = await download(access_token, media_id)
  console.log(data)
  fs.writeFileSync(`./public/zhouhp/amr/${media_id}.amr`, data, 'binary')
  // amrToMp3(sourcePath[,outputPath])
  let error, back
  amrToMp3(`./public/zhouhp/amr/${media_id}.amr`, `./public/zhouhp/mp3/${media_id}.mp3`)
    .then((a) => {
      back = a // ./src/mp3/test.mp3
    })
    .catch((err) => {
      error = err
    })
  res.send({ err, a });
})


module.exports = router;