var fs = require("fs");

function read(src, callback) {
	fs.readFile(src, function(err, data) {
		if (err) {
			return console.error(err);
		}
		console.log("loading file: " + src);
		callback(data.toString());
	});
}

function readSync(src) {
	var data = fs.readFileSync(src);
	return data.toString();
}

function write(src, content) {
	fs.writeFile(src, content, function(err) {
		if (err) {
			return console.error(err);
		}
		console.log("writed file：" + src + " content: " + content);
	});
}

function append(src, content) {
	fs.appendFile(src, content, function(err) {
		if (err) {
			return console.error(err);
		}
		console.log("writed file：" + src + " content: " + content);
	});
}

function readPropertiesSync(src) {
	var data = readSync(src);
    var obj = new Object();
	data.split("\n").map(function (i) {
		//跳过注释
		if (i.indexOf("#") == -1) {
			var temp = i.split("=");
			if (temp.length == 2) {
				obj[temp[0]] = temp[1];
			}
		}
	});
	return obj;
}

exports.read = read;
exports.write = write;
exports.append = append;
exports.readPropertiesSync = readPropertiesSync;