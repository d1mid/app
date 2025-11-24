import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Container, Row, Image, ListGroup } from 'react-bootstrap';
import { fetchBasket, clearBasket, removeOneFromBasket } from '../http/BasketApi';
import type { IBasket } from '../http/BasketApi';

const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<IBasket | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBasket();
        setBasket(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const groupedItems = useMemo(() => {
    if (!basket) return [];
    const map = new Map<number, { count: number; price: number; name: string; img: string }>();
    for (const bd of basket.basket_devices) {
      const d = bd.device;
      const prev = map.get(d.id);
      if (prev) {
        prev.count += 1;
      } else {
        map.set(d.id, { count: 1, price: d.price, name: d.name, img: d.img });
      }
    }
    return Array.from(map.entries()).map(([deviceId, v]) => ({
      deviceId,
      ...v,
    }));
  }, [basket]);

  const totalPrice = useMemo(
    () => groupedItems.reduce((sum, item) => sum + item.price * item.count, 0),
    [groupedItems]
  );

  const handleClear = async () => {
    try {
      await clearBasket();
      setBasket(prev => (prev ? { ...prev, basket_devices: [] } : prev));
    } catch (e) {
      alert(e);
    }
  };

  const handleRemoveOne = async (deviceId: number) => {
    try {
      await removeOneFromBasket(deviceId);
      setBasket(prev =>
        prev
          ? {
              ...prev,
              basket_devices: prev.basket_devices.filter(
                (bd, idx) =>
                  !(
                    bd.deviceId === deviceId &&
                    prev.basket_devices.findIndex(bd2 => bd2 === bd) === idx
                  )
              ),
            }
          : prev
      );
      fetchBasket();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h3>Корзина</h3>
          {loading && <div>Загрузка...</div>}
          {!loading && groupedItems.length === 0 && <div>Корзина пуста</div>}
          {!loading && groupedItems.length > 0 && (
            <ListGroup>
              {groupedItems.map(item => (
                <ListGroup.Item key={item.deviceId}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={import.meta.env.VITE_API_URL + item.img}
                        thumbnail
                        style={{ maxHeight: 80 }}
                      />
                    </Col>
                    <Col md={4}>{item.name}</Col>
                    <Col md={2}>x {item.count}</Col>
                    <Col md={2}>{item.price * item.count} ₽</Col>
                    <Col md={2}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveOne(item.deviceId)}
                      >
                        −1
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Итого:</h5>
            <h3>{totalPrice} ₽</h3>
            <Button
              variant="outline-danger"
              className="mt-3"
              onClick={handleClear}
              disabled={groupedItems.length === 0}
            >
              Очистить корзину
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BasketPage;
