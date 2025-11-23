import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../../main';

type CreateDeviceProps = {
  show: boolean;
  onHide: () => void;
};

const CreateDevice: React.FC<CreateDeviceProps> = ({show, onHide}) => {
  const {device} = useContext(Context)!; // убрать !
  const [info, setInfo] = useState<Array<{
    title: string;
    description: string;
    number: number;
  }>>([]);

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number: number) => {
    setInfo(info.filter(i => i.number !== number))
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
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className='mt-3'
            placeholder='Введите название устройства'
          />
          <Form.Control
            className='mt-3'
            placeholder='Введите стоимость устройства'
            type = 'number'
          />
          <Form.Control
            className='mt-3'
            type='file'
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
                placeholder='Введите название характеристики'
                />
              </Col>
              <Col md={4}>
               <Form.Control
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
          <Button onClick={onHide}>Добавить</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice