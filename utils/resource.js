const resource = (router, name, controller, Model) => {

  // automatic model binding
  router.param('id', async (req, res, next, id) => {
    try {
      const model = await Model.findById(id);

      if (!model) {
        return res.status(404).json({
          success: false,
          error: `${name.slice(0, -1)} not found`
        });
      }

      req.model = model; // generic binding
      req.product = model; // binding expected by product controller
      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Invalid ID'
      });
    }
  });

  // CRUD routes
  router.get(`/${name}`, controller.index);
  router.get(`/${name}/:id`, controller.show);
  router.post(`/${name}`, controller.store);
  router.put(`/${name}/:id`, controller.update);
  router.delete(`/${name}/:id`, controller.destroy);

  return router;
};

module.exports = resource;