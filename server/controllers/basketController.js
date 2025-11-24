const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async getBasket(req, res, next) {
    try {
      const userId = req.user.id;

      const basket = await Basket.findOne({
        where: { userId },
        include: [
          {
            model: BasketDevice,
            include: [Device],
          },
        ],
      });

      if (!basket) {
        return res.json({
          id: null,
          userId,
          basket_devices: [],
        });
      }

      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addDevice(req, res, next) {
    try {
      const userId = req.user.id;
      const { deviceId } = req.body;

      if (!deviceId) {
        return next(ApiError.badRequest('Нет deviceId'));
      }

      const device = await Device.findByPk(deviceId);
      if (!device) {
        return next(ApiError.badRequest('Девайс не найден'));
      }

      let basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        basket = await Basket.create({ userId });
      }

      const basketDevice = await BasketDevice.create({
        basketId: basket.id,
        deviceId,
      });

      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async decrementDevice(req, res, next) {
    try {
      const userId = req.user.id;
      const { deviceId } = req.body;

      if (!deviceId) {
        return next(ApiError.badRequest('Нет deviceId'));
      }

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.badRequest('Корзина не найдена'));
      }

      const basketDevice = await BasketDevice.findOne({
        where: { basketId: basket.id, deviceId },
      });

      if (!basketDevice) {
        return next(ApiError.badRequest('Девай не в корзине!'));
      }

      await basketDevice.destroy();

      return res.json({ message: 'Товар успешно удален' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeDevice(req, res, next) {
    try {
      const userId = req.user.id;
      const { deviceId } = req.body;

      if (!deviceId) {
        return next(ApiError.badRequest('Нет deviceId'));
      }

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.badRequest('Корзина не найдена'));
      }

      await BasketDevice.destroy({
        where: { basketId: basket.id, deviceId },
      });

      return res.json({ message: 'Товар успешно удален' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async clearBasket(req, res, next) {
    try {
      const userId = req.user.id;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return res.json({ message: 'Корзина пуста' });
      }

      await BasketDevice.destroy({
        where: { basketId: basket.id },
      });

      return res.json({ message: 'Корзина очищена' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();