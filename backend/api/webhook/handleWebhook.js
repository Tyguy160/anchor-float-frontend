const stripe = require('stripe')('sk_test_b0MPemUYvtnsaU6aaHzyMKUA');
const { getDBConnection } = require('../createServer');

const handleWebhook = async (req, res) => {
  res.status(200).send(); // Stripe wants to see a response right away

  if (req.body.type === 'checkout.session.completed') {
    const db = await getDBConnection();
    const stripeSession = req.body.data.object;
    const sessionId = stripeSession.id;
    const stripeSubscriptionId = stripeSession.subscription;
    const stripeCustomerId = stripeSession.customer.id;

    stripe.checkout.sessions.retrieve(sessionId, async (err, session) => {
      const { id: stripePlanId } = session.display_items[0].plan;

      const { creditsPerMonth } = await db.plans.findOne({
        where: { stripePlanId },
      }).catch(console.log);

      const { creditsRemaining } = await db.users.findOne({
        where: { id: session.client_reference_id },
      }).catch(console.log);

      const updatedCreditsRemaining = creditsPerMonth + creditsRemaining;

      await db.users.update({
        where: { id: session.client_reference_id },
        data: {
          plan: { connect: { stripePlanId } },
          stripeSubscriptionId,
          stripeCustomerId,
          creditsRemaining: updatedCreditsRemaining,
        },
      });
    });
  }
};

module.exports = { handleWebhook };
