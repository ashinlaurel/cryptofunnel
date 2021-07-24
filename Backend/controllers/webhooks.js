exports.coinbaseConfirmPayment = async (req, res) => {
  const rawBody = req.rawBody;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = `${process.env.WEBHOOK_SECRET}`;

  console.log(rawBody);

  try {
    const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);

    if (event.type === "charge:pending") {
      // TODO
      // user paid, but transaction not confirm on blockchain yet
    }

    if (event.type === "charge:confirmed") {
      // TODO
      // all good, charge confirmed
    }

    if (event.type === "charge:failed") {
      // TODO
      // charge failed or expired
    }
    res.status(200).json({ raw: rawBody, status: event.id });
    // res.send(`success ${event.id}`);
  } catch (error) {
    functions.logger.error(error);
    res.status(400).send("failure!");
  }
};
