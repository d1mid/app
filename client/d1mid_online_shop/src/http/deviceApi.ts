import type { IBrand, IDevice, IType } from '../store/DeviceStore';
import { $host, $authHost } from './index';


export const CreateType = async (type: IType) => {
  const {data} = await $authHost.post('api/type', type);
  return data;
}

export const fetchTypes = async () => {
  const {data} = await $host.get('api/type');
  return data;
}

export const CreateBrand = async (brand: IBrand) => {
  const {data} = await $authHost.post('api/brand', brand);
  return data;
}

export const fetchBrands = async () => {
  const {data} = await $host.get('api/brand');
  return data;
}

export const CreateDevice = async (device: IDevice) => {
  const {data} = await $authHost.post('api/device', device);
  return data;
}

export const fetchDevices = async () => {
  const {data} = await $host.get('api/device');
  return data;
}

export const fetchOneDevice = async (id: number) => {
  const {data} = await $host.get('api/device/' + id);
  return data;
}
