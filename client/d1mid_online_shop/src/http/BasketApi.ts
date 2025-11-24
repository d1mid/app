
import { $authHost } from './index';
import type { IDevice } from '../store/DeviceStore';

export interface IBasketDevice {
  id: number;
  basketId: number;
  deviceId: number;
  device: IDevice;
}

export interface IBasket {
  id: number | null;
  userId: number;
  basket_devices: IBasketDevice[];
}

export const addToBasket = async (deviceId: number): Promise<IBasketDevice> => {
  const { data } = await $authHost.post<IBasketDevice>('api/basket/add', { deviceId });
  return data;
};

export const fetchBasket = async (): Promise<IBasket> => {
  const { data } = await $authHost.get<IBasket>('api/basket');
  return data;
};

export const removeOneFromBasket = async (deviceId: number): Promise<{ message: string }> => {
  const { data } = await $authHost.post<{ message: string }>('api/basket/decrement', { deviceId });
  return data;
};

export const removeDeviceFromBasket = async (deviceId: number): Promise<{ message: string }> => {
  const { data } = await $authHost.post<{ message: string }>('api/basket/remove', { deviceId });
  return data;
};

export const clearBasket = async (): Promise<{ message: string }> => {
  const { data } = await $authHost.post<{ message: string }>('api/basket/clear');
  return data;
};
