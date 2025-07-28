// seeds/07_order_status_history.js

exports.seed = async function (knex) {
  await knex('order_status_history').del();
  await knex.raw('ALTER TABLE order_status_history AUTO_INCREMENT = 1');

  const statusHistory = [
    {
      order_id: 1,
      status: 'pending',
      changed_at: new Date()
    },
    {
      order_id: 2,
      status: 'pending',
      changed_at: new Date()
    }
  ];

  await knex('order_status_history').insert(statusHistory);
};
