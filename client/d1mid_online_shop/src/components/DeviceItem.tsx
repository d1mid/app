import React, { useContext } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import type { IDevice } from '../store/DeviceStore'
import star from '../assets/star.png'
import { useHistory } from 'react-router'
import { DEVICE_ROUTE } from '../utils/consts'
import styles from './DeviceItem.module.css'
import { Context } from '../main'

type DeviceItemProps = {
  device: IDevice
}

const DeviceItem: React.FC<DeviceItemProps> = ({device}) => {
  const history = useHistory();
  const { device: deviceStore } = useContext(Context)!;
  const brandObj = deviceStore.brands.find(b => b.id === device.brandId);
  const brandName = brandObj?.name || '—';

  
  return (
    <Col md={3} className={styles.cardCol} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
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
      </Card>
    </Col>
  )
}

export default DeviceItem
