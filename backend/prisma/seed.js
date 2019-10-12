const { getDB } = require('./db');

const plansToAdd = [
  { name: 'Free', level: 0, creditsPerMonth: 0 },
  { name: 'Basic', level: 1, creditsPerMonth: 3 },
  { name: 'Standard', level: 2, creditsPerMonth: 5 },
  { name: 'Pro', level: 3, creditsPerMonth: 10 },
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
          },
        })
        .catch(console.error);
    });
    db.plans.findMany().then((plans) => {
      console.log(plans);
      process.exit(0);
    });
  })
  .catch(console.err);
