import React, { useContext } from 'react';
import { Card, Col, Image, Button } from 'react-bootstrap';
import type { IDevice } from '../store/DeviceStore';
import star from '../assets/star.png';
import { useHistory } from 'react-router';
import { DEVICE_ROUTE } from '../utils/consts';
import styles from './DeviceItem.module.css';
import { Context } from '../main';
import { addToBasket } from '../http/BasketApi';

type DeviceItemProps = {
  device: IDevice;
};

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  const history = useHistory();
  const { device: deviceStore } = useContext(Context)!;
  const brandObj = deviceStore.brands.find(b => b.id === device.brandId);
  const brandName = brandObj?.name || '—';

  const handleCardClick = () => {
    history.push(DEVICE_ROUTE + '/' + device.id);
  };

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation(); 
    try {
      await addToBasket(device.id);
    } catch (err) {
      alert(e);
    }
  };

  return (
    <Col md={3} className={styles.cardCol} onClick={handleCardClick}>
      <Card className={styles.card}>
        <Image className={styles.image} src={import.meta.env.VITE_API_URL + device.img} />
        <div className={styles.infoRow}>
          <div className={styles.brand}>{brandName}</div>
          <div className={styles.ratingWrap}>
            <div className={styles.ratingValue}>{device.rating}</div>
            <Image className={styles.starImg} src={star} />
          </div>
        </div>
        <span className={styles.deviceName}>{device.name}</span>
        <Button
          variant="outline-primary"
          className={styles.addToCartButton}
          onClick={handleAddClick}
        >
          В корзину
        </Button>
      </Card>
    </Col>
  );
};

export default DeviceItem;