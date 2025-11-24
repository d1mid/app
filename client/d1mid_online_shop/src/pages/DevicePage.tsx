import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Image, Table } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router';
import type { IDevice } from '../store/DeviceStore';
import { fetchOneDevice } from '../http/deviceApi';
import { addToBasket } from '../http/BasketApi';
import styles from './DevicePage.module.css';

const DevicePage = () => {
  const [device, setDevice] = useState<IDevice>({
    id: 0, name: '', price: 0, rating: 0, img: '', info: [],
  });
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchOneDevice(Number(id)).then(data => setDevice(data));
    }
  }, [id]);

  const handleAddToBasket = async () => {
    if (!device.id) return;
    try {
      await addToBasket(device.id);
      alert('Товар добавлен в корзину');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container className={styles.wrapper}>
      <Row className={styles.rowSpacing}>
        <Col md={5}>
          <Card className={styles.productCard}>
            <Image
              className={styles.image}
              src={import.meta.env.VITE_API_URL + device.img}
              rounded
            />
            <h3 className={styles.name}>{device.name}</h3>
            <div className={styles.rating}>
              <img
                src={bigStar}
                alt="Рейтинг"
                style={{ width: 24, height: 24, marginRight: 4 }}
              />
              {device.rating}
            </div>
          </Card>
        </Col>
        <Col md={5}>
          <Card className={styles.cartCard}>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Цена</span>
              <h1 className={styles.price}>{device.price} ₽</h1>
            </div>
            <Button
              className={styles.cartButton}
              onClick={handleAddToBasket}
              disabled={!device.id}
            >
              В корзину
            </Button>
            <div className={styles.featuresSection}>
              <h5 className={styles.featuresTitle}>Характеристики</h5>
              <Table borderless size="sm" className={styles.featuresTable}>
                <tbody>
                  {device.info.map((info, idx) => (
                    <tr
                      key={info.id}
                      className={idx % 2 === 0 ? styles.tableRowEven : undefined}
                    >
                      <td className={styles.featuresName}>{info.title}</td>
                      <td className={styles.featuresValue}>{info.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DevicePage;
