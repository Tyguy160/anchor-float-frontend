const { db } = require('./db');

const plansToAdd = [
  { name: 'Free', level: 0, siteLimit: 0 },
  { name: 'Basic', level: 1, siteLimit: 3 },
  { name: 'Standard', level: 2, siteLimit: 5 },
  { name: 'Advanced', level: 3, siteLimit: 10 },
];

db.connect().then(() => {
  plansToAdd.forEach((plan) => {
    db.plans
      .create({
        data: {
          name: plan.name,
          level: plan.level,
          siteLimit: plan.siteLimit,
        },
      })
      .catch(e => console.log);
  });
  db.plans.findMany().then(plans => console.log(plans));
});
