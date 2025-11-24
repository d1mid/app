import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../../main';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi';
import { observer } from 'mobx-react-lite';
import axios, { AxiosError } from 'axios';

type CreateDeviceProps = {
  show: boolean;
  onHide: () => void;
};

const CreateDevice: React.FC<CreateDeviceProps> = observer(({show, onHide}) => {
  const {device} = useContext(Context)!;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<Array<{
    title: string;
    description: string;
    number: number;
  }>>([]);

   useEffect(() => {
      fetchTypes().then(data => device.setTypes(data))
      fetchBrands().then(data => device.setBrands(data))
      fetchDevices().then(data => device.setDevice(data.rows))
    }, []);

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number: number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
    setFile(e.target.files[0]);
  }
  }

const addDevice = async () => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    if (file) {
      formData.append('img', file);
    }
    formData.append('brandId', String(device.selectedBrand?.id));
    formData.append('typeId', String(device.selectedType?.id));
    formData.append('info', JSON.stringify(info));
    await createDevice(formData);
    onHide();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Ошибка при создании устройства');
    } else {
      alert('Неизвестная ошибка');
    }
  }
}

  return (
    <Modal
        show = {show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить новый тип
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedType?.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item 
                onClick={() => device.setSelectedType(type)} 
                key={type.id}
                >{type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedBrand?.name || 'Выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item 
                onClick={() => device.setSelectedBrand(brand)} 
                key={brand.id}
                >{brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-3'
            placeholder='Введите название устройства'
          />
          <Form.Control
            value={price}
            onChange={e => setPrice(e.target.value)}
            className='mt-3'
            placeholder='Введите стоимость устройства'
            type = 'number'
          />
          <Form.Control
            className='mt-3'
            type='file'
            onChange={selectFile}
          />
          <hr/>
          <Button
            onClick={addInfo}
          >Добавить новое свойство
          </Button>
          {info.map(i =>
            <Row className='mt-4' key={i.number}>
              <Col md={4}>
               <Form.Control
                value={i.title}
                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                placeholder='Введите название характеристики'
                />
              </Col>
              <Col md={4}>
               <Form.Control
                value={i.description}
                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                placeholder='Введите описание характеристики'
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Закрыть</Button>
          <Button onClick={addDevice}>Добавить</Button>
        </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice