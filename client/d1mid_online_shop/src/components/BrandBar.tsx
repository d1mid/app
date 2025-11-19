import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../main'
import { Card, Row, Col } from 'react-bootstrap';

const BrandBar = observer(() => {
  const {device} = useContext(Context)!; // Убрать ! после бэка
  return (
    <Row className='d-flex flex-row flex-wrap'>
      {device.brands.map(brand =>
        <Col
          style={{cursor: 'pointer'}}
          key={brand.id} 
          md={3} 
          className="mb-3"
          onClick={() => device.setSelectedBrand(brand)}
        >
          <Card 
          className="p-3 align-items-center"
          border = {brand.id === device.selectedBrand.id ? 'success' : 'info'}
          >
            {brand.name}
          </Card>
        </Col>
  )}

    </Row>
  )
});

export default BrandBar