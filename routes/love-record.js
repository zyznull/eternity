var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var rd = require('rd');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var router = express.Router();
var file = require('./file.js')
var path = require('path')


/* 获取所有语句 */
router.get('/says', function (req, res) {
    var says = new Array();
    file.read(path.resolve(__dirname, '../public/config/says.txt'), function (data) {
        data.split("\n").map(function (i) {
            //最后一句
            if (i == "")
                says.push("时间不停，爱你不止，携子之手，白头偕老");
            else
                says.push(i);
        });
        res.json(says);
    });
});

/* 获取所有图片名 */
router.get('/imgs', function (req, res) {
    var regex = new RegExp("\\.jpg$|\\.png$");
    var imgs = new Array();

    var files = rd.readSync('./public/images/love-record');
    files.map(function (str) {
        var file = path.basename(str);
        if (regex.test(file.toLowerCase())) {
            imgs.push(file);
        }
    });

    //按文件序数排序
    imgs.sort(function (img1, img2) {
        var i1 = parseInt(img1.split(".")[0]);
        var i2 = parseInt(img2.split(".")[0]);
        return isNaN(i1) ? 1 : isNaN(i2) ? -1 : i1 - i2;
    });

    //加入前缀
    for (var i in imgs) {
        imgs[i] = '/images/love-record/' + imgs[i];
    }
    res.json(imgs);
});


module.exports = router;