const { getDB } = require('./db');

const plansToAdd = [
  {
    name: 'Free',
    level: 0,
    creditsPerMonth: 0,
    stripePlanId: 'free',
  },
  {
    name: 'Economy',
    level: 1,
    creditsPerMonth: 1,
    stripePlanId: 'plan_GGjkWrQ9lZNBwI',
  },
  {
    name: 'Basic',
    level: 2,
    creditsPerMonth: 3,
    stripePlanId: 'plan_GGjlaO7xQD0kk8',
  },
  {
    name: 'Standard',
    level: 3,
    creditsPerMonth: 5,
    stripePlanId: 'plan_GGjlQ5w2ioUStl',
  },
  {
    name: 'Pro',
    level: 4,
    creditsPerMonth: 10,
    stripePlanId: 'plan_GGjljwH7KKU8qR',
  },
];

const db = getDB();

db.connect()
  .then(() => {
    plansToAdd.forEach(plan => {
      console.log(plan);
      db.plans
        .create({
          data: {
            name: plan.name,
            level: plan.level,
            creditsPerMonth: plan.creditsPerMonth,
            stripePlanId: plan.stripePlanId,
          },
        })
        .catch(console.error);
    });

    setTimeout(
      () =>
        db.plans.findMany().then(plans => {
          console.log(plans);
          process.exit(0);
        }),
      3000
    );
  })
  .catch(console.err);
