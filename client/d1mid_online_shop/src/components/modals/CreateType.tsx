import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createType } from '../../http/deviceApi';

type CreateTypeProps = {
  show: boolean;
  onHide: () => void;
};

const CreateType: React.FC<CreateTypeProps> = ({show, onHide}) => {
  const [value, setValue] = useState('');

  const addType = () => {
    createType({name: value}).then(data => {
      setValue('')
      onHide();
  })
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
          <Form>
            <Form.Control
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder='Введите название типа...'
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Закрыть</Button>
          <Button onClick={addType}>Добавить</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateType