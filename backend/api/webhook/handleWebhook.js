const stripe = require('stripe')('sk_test_b0MPemUYvtnsaU6aaHzyMKUA');
const { getDBConnection } = require('../createServer');

const handleWebhook = async (req, res) => {
  const db = await getDBConnection();
  if (req.body.type === 'checkout.session.completed') {
    const stripeSession = req.body.data.object;
    const sessionId = stripeSession.id;
    const stripeSubscriptionId = stripeSession.subscription;
    const stripeCustomerId = stripeSession.customer.id;

    stripe.checkout.sessions.retrieve(sessionId, async (err, session) => {
      const { id: stripePlanId } = session.display_items[0].plan;

      const planCreditsPerMonth = await db.plans.findOne({
        where: { stripePlanId },
      }).creditsPerMonth;

      const creditsRemaining = await db.users.findOne({
        where: { id: session.client_reference_id },
      }).creditsRemaining;

      const user = await db.users.update({
        where: { id: session.client_reference_id },
        data: {
          plan: { connect: { stripePlanId } },
          stripeSubscriptionId,
          stripeCustomerId,
          creditsRemaining: creditsRemaining + planCreditsPerMonth,
        },
      });
    });
  }

  if (req.body.type == 'customer.subscription.updated') {
    console.log(req.body);
  }

  res.send('OK');
};

module.exports = { handleWebhook };
