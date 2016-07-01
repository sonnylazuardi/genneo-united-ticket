var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
const dirName = process.env.STORAGE_DIR || path.join(__dirname, 'storage');
var db = new Datastore({ filename: path.join(dirName, 'daftar'), autoload: true });

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://gbipplriaubdg@gmail.com:gbipplriaubdg<3@smtp.gmail.com');

var app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({
    limit : '100kb'
}));

app.get('/', function(req, res) {

});

app.post('/daftar', function(req, res) {
    var data = req.body.data;
    db.insert(data, function (err, newDoc) {
        var mailOptions = {
            from: '"Genneo 👥" <genneo@gbippl.id>', // sender address
            to: data.email,
            subject: 'Pendaftaran Genneo United', // Subject line
            text: 'Genneo United 🐴', // plaintext body
            html: '<b>jangan lupa bawa tiket ini dan tunjukkan ke usher ya ✔ 🐴</b><br>nomor pendaftaran: ' + newDoc._id // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        res.json({
            data: newDoc,
            error: err,
            success: !err
        });
    });
});

app.get('/pendaftar', function(req, res) {
    db.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.server.listen(process.env.PORT || 7010);
console.log(`genneo united is on ${app.server.address().port}`);