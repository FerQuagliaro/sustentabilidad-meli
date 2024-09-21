module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b475750d3cda807ca06be908d31e3ff6'),
  },
});
