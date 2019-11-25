const stripe = require('stripe')('sk_test_b0MPemUYvtnsaU6aaHzyMKUA');

const handleWebhook = async (req, res, api) => {
  res.status(200).send(); // Stripe wants to see a response right away

  if (req.body.type === 'checkout.session.completed') {
    const stripeSession = req.body.data.object;
    const { id: sessionId, subscription } = stripeSession;

    stripe.checkout.sessions.retrieve(sessionId, async (err, session) => {
      const { id: stripePlanId } = session.display_items[0].plan;
      console.log(`Stripe plan ID: ${stripePlanId}`);

      let { db } = await api;

      const plan = await db.plans
        .findOne({
          where: { stripePlanId: stripePlanId },
        })
        .catch(() => {
          throw new Error('No plan found');
        });

      const user = await db.users
        .findOne({
          where: { id: session.client_reference_id },
        })
        .catch(console.log);

      const updatedCreditsRemaining =
        plan.creditsPerMonth + user.creditsRemaining;

      await db.users.update({
        where: { id: session.client_reference_id },
        data: {
          plan: { connect: { stripePlanId } },
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscription,
          creditsRemaining: updatedCreditsRemaining,
        },
      });
    });
  }

  if (req.body.type === 'customer.subscription.updated') {
    const stripeSubscription = req.body.data.object;

    let { db } = await api;
    // Update plan ID in DB
    await db.users.update({
      where: { stripeCustomerId: stripeSubscription.customer },
      data: {
        plan: {
          connect: { stripePlanId: stripeSubscription.plan.id },
        },
      },
    });
  }
};

module.exports = { handleWebhook };
