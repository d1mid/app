import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

type CreateBrandProps = {
  show: boolean;
  onHide: () => void;
};

const CreateBrand: React.FC<CreateBrandProps> = ({show, onHide}) => {
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
              placeholder='Введите название бренда...'
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Закрыть</Button>
          <Button onClick={onHide}>Добавить</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand