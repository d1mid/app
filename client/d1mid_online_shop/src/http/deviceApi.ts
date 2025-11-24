import type { IBrand, IDevice, IType } from '../store/DeviceStore';
import { $host, $authHost } from './index';


export interface CreateTypeRequest {
  name: string;
}

export interface CreateBrandRequest {
  name: string;
}

export interface CreateDeviceRequest {
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  img: string;
  info: Array<{ title: string; description: string }>;
}

export const createType = async (type: CreateTypeRequest): Promise<IType> => {
  const { data } = await $authHost.post<IType>('api/type', type);
  return data;
};

export const createBrand = async (brand: CreateBrandRequest): Promise<IBrand> => {
  const { data } = await $authHost.post<IBrand>('api/brand', brand);
  return data;
};

export const createDevice = async (device: FormData): Promise<IDevice> => {
  const { data } = await $authHost.post<IDevice>('api/device', device);
  return data;
};

export const fetchTypes = async (): Promise<IType[]> => {
  const { data } = await $host.get<IType[]>('api/type');
  return data;
};

export const fetchBrands = async (): Promise<IBrand[]> => {
  const { data } = await $host.get<IBrand[]>('api/brand');
  return data;
};

export const fetchDevices = async (
  typeId?: number,
  brandId?: number,
  page: number = 1,
  limit: number = 5
): Promise<{ rows: IDevice[]; count: number }> => {
  const params: Record<string, string | number> = { page, limit };
  if (typeof typeId === 'number') params.typeId = typeId;
  if (typeof brandId === 'number') params.brandId = brandId;
  const { data } = await $host.get<{ rows: IDevice[]; count: number }>('api/device', { params });
  return data;
};

export const fetchOneDevice = async (id: number): Promise<IDevice> => {
  const { data } = await $host.get<IDevice>('api/device/' + id);
  return data;
};

export const deleteType = async (id: number): Promise<{ message: string }> => {
  const { data } = await $authHost.delete<{ message: string }>('api/type/' + id);
  return data;
};

export const deleteBrand = async (id: number): Promise<{ message: string }> => {
  const { data } = await $authHost.delete<{ message: string }>('api/brand/' + id);
  return data;
};

export const deleteDevice = async (id: number): Promise<{ message: string }> => {
  const { data } = await $authHost.delete<{ message: string }>('api/device/' + id);
  return data;
};

