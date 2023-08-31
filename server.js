import express from 'express';
import axios from 'axios';
import {} from 'dotenv/config';
import bodyParser from 'body-parser';


const app = express()
const port = 3000

// Set up static file serving and EJS as the view engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Parse request bodies as JSON
app.use(express.json());

app.get('/', (req, res) => {
   res.render('index');
 });
 import https from 'https'

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction',
  method: 'GET',
  headers: {
    Authorization: 'Bearer SECRET_KEY'
  }
}

https.request(options, res => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', () => {
    console.log(JSON.parse(data))
  })
}).on('error', error => {
  console.error(error)
})

app.post('/Paystack', async(req,res)=>{
   const {amount, email} = req.body
   try {  
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          'amount': amount * 100, // Paystack requires the amount in kobo (smallest currency unit)
          'email': email        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const { authorization_url, access_code } = response.data.data;
    res.redirect(authorization_url);
    console.log(access_code)
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while initializing.' });
    }
   })
app.listen(port, ()=>{
   console.log('server is on port 3000')
})

 

