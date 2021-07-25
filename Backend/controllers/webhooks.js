var Webhook = require('coinbase-commerce-node').Webhook;

 exports.rawBody=async(req, res, next)=> {
  req.setEncoding('utf8');

  console.log("hereo");

  var data = '';

 try {
  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    req.rawBody = data;
    next();
  });   
 } catch (error) {
   console.log("error",error);
 }
}

exports.coinbaseConfirmPayment = async (request, response) => {
  // const rawBody = req.rawBody;
  // const signature = req.headers["x-cc-webhook-signature"];
  // const webhookSecret = `${process.env.WEBHOOK_SECRET}`;
  const webhookSecret = "219d37cd-8d83-40f7-bec8-378bd51cada1";

  // console.log("printing:",req);

  var event;

	console.log(request.headers);
	// console.log(request.rawBody);



  try {
		event = Webhook.verifyEventBody(
			request.rawBody,
			request.headers['x-cc-webhook-signature'],
			webhookSecret
		);
	} catch (error) {
		console.log('Error occured', error.message);

		return response.status(400).send('Webhook Error:' + error.message);
	}

	console.log('Success', event.id);

	response.status(200).send('Signed Webhook Received: ' + event.id);

  // res.status(200);
  // try {
  //   const event = Webhook.verifySigHeader(rawBody, signature, webhookSecret);

  //   if (event.type === "charge:pending") {
  //     // TODO
  //     // user paid, but transaction not confirm on blockchain yet
  //   }

  //   if (event.type === "charge:confirmed") {
  //     // TODO
  //     // all good, charge confirmed
  //   }

  //   if (event.type === "charge:failed") {
  //     // TODO
  //     // charge failed or expired
  //   }
  //   // res.status(200).json({ raw: rawBody, status: event.id });
  //   // res.send(`success ${event.id}`);
  // } catch (error) {
  //   // functions.logger.error(error);
  //   console.log(error);
  //   res.status(400).send("failure!");
  // }
};
