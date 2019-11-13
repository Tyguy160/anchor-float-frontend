const { getDB } = require('./db');

const plansToAdd = [
  {
    name: 'Free',
    level: 0,
    creditsPerMonth: 0,
    stripePlanId: 'free',
  },
  {
    name: 'Basic',
    level: 1,
    creditsPerMonth: 3,
    stripePlanId: 'plan_FyidUQxlYdDu28',
  },
  {
    name: 'Standard',
    level: 2,
    creditsPerMonth: 5,
    stripePlanId: 'plan_FyiUKqbkV2ROuY',
  },
  {
    name: 'Pro',
    level: 3,
    creditsPerMonth: 10,
    stripePlanId: 'plan_FyiUoIdKqgbIfv',
  },
];

const db = getDB();

db.connect()
  .then(() => {
    plansToAdd.forEach((plan) => {
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

    setTimeout(() => db.plans.findMany().then((plans) => {
      console.log(plans);
      process.exit(0);
    }), 3000);
  })
  .catch(console.err);
