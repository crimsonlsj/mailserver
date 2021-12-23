const nodemailer = require('nodemailer');
const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
const port = 3000

require('dotenv').config()

app.post('/', (req, res) => {
  console.log(req.body);
  main(req.body);
  res.send(200);
})

const main = async ({title, category, contents}) => {
    let transporter = nodemailer.createTransport({
      service: 'Naver',
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"메이크 프로덕션 가격 요청서" <${process.env.NODEMAILER_USER}>`,
      to: 'polarislsj@gmail.com',
      subject: title,
      text: category,
      html: `<b>${contents}</b>`,
    });
  
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // res.status(200).json({
    //   status: 'Success',
    //   code: 200,
    //   message: 'Sent Auth Email',
    // });
  };
  
//   main().catch(console.error);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })