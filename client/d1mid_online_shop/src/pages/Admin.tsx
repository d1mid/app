import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Dropdown } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import { Context } from '../main';
import {
  fetchTypes,
  fetchBrands,
  fetchDevices,
  deleteType,
  deleteBrand,
  deleteDevice,
} from '../http/deviceApi';
import  { observer } from 'mobx-react-lite';

const Admin: React.FC = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  const { device: deviceStore } = useContext(Context)!;

  useEffect(() => {
    fetchTypes().then(data => deviceStore.setTypes(data));
    fetchBrands().then(data => deviceStore.setBrands(data));
    fetchDevices().then(data => deviceStore.setDevice(data.rows));
  }, []);

  const confirmDelete = (entityName: string) =>
    window.confirm(`Вы действительно хотите удалить «${entityName}»?`);

  const handleDeleteType = async (id: number) => {
    const t = deviceStore.types.find(x => x.id === id);
    if (!t) return;
    if (!confirmDelete(`тип ${t.name}`)) return;

    await deleteType(id);
    deviceStore.setTypes(deviceStore.types.filter(x => x.id !== id));
  };

  const handleDeleteBrand = async (id: number) => {
    const b = deviceStore.brands.find(x => x.id === id);
    if (!b) return;
    if (!confirmDelete(`бренд ${b.name}`)) return;

    await deleteBrand(id);
    deviceStore.setBrands(deviceStore.brands.filter(x => x.id !== id));
  };

  const handleDeleteDevice = async (id: number) => {
    const d = deviceStore.devices.find(x => x.id === id);
    if (!d) return;
    if (!confirmDelete(`устройство ${d.name}`)) return;

    await deleteDevice(id);
    deviceStore.setDevice(deviceStore.devices.filter(x => x.id !== id));
  };

  return (
    <Container className="d-flex flex-column">
      <h3 className="mt-4 mb-3">Админ панель</h3>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2 mb-4"
        onClick={() => setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>
      <div className='d-flex flex-column align-items-center'>
      <h5 className="mt-3">Удаление типов</h5>
      <Dropdown className="mt-2 mb-3">
        <Dropdown.Toggle variant="outline-dark">
          Выберите тип для удаления
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {deviceStore.types.map(type => (
            <Dropdown.Item
              key={type.id}
              onClick={() => handleDeleteType(type.id)}
            >
              {type.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <h5 className="mt-3">Удаление брендов</h5>
      <Dropdown className="mt-2 mb-3">
        <Dropdown.Toggle variant="outline-dark">
          Выберите бренд для удаления
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {deviceStore.brands.map(brand => (
            <Dropdown.Item
              key={brand.id}
              onClick={() => handleDeleteBrand(brand.id)}
            >
              {brand.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <h5 className="mt-3">Удаление устройств</h5>
      <Dropdown className="mt-2 mb-4">
        <Dropdown.Toggle variant="outline-dark">
          Выберите устройство для удаления
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {deviceStore.devices.map(dev => (
            <Dropdown.Item
              key={dev.id}
              onClick={() => handleDeleteDevice(dev.id)}
            >
              {dev.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
    </Container>
  );
});

export default Admin;
