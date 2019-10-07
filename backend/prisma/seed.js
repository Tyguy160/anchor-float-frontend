const { getDB } = require('./db');

const plansToAdd = [
  { name: 'Free', level: 0, siteLimit: 0 },
  { name: 'Basic', level: 1, siteLimit: 3 },
  { name: 'Standard', level: 2, siteLimit: 5 },
  { name: 'Advanced', level: 3, siteLimit: 10 },
];

const db = getDB();

db.connect().then(() => {
  plansToAdd.forEach((plan) => {
    console.log(plan);
    db.plans
      .create({
        data: {
          name: plan.name,
          level: plan.level,
          siteLimit: plan.siteLimit,
        },
      }).catch(console.error);
  });
  db.plans.findMany().then((plans) => {
    console.log(plans);
    process.exit(0);
  });
}).catch(console.err);
