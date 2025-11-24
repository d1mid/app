const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res) {
    const {name} = req.body;
    const type = await Type.create({name});
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params;
      const type = await Type.findByPk(id);
      if (!type) {
        return res.status(404).json({message: 'Тип не найден'});
      }
      await type.destroy();
      return res.json({message: 'Тип удалён'});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TypeController();
