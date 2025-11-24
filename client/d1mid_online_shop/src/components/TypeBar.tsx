import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../main'
import { ListGroup } from 'react-bootstrap'
import styles from './TypeBar.module.css'

const TypeBar = observer(() => {
  const { device } = useContext(Context)!;

  return (
    <ListGroup className={styles.listGroup}>
      {device.selectedType &&
        <ListGroup.Item
          className={styles.reset}
          onClick={() => device.setSelectedType(undefined)}
        >
           Все типы
        </ListGroup.Item>
      }
      {device.types.map(type =>
        <ListGroup.Item
          key={type.id}
          className={
            type.id === device.selectedType?.id
              ? `${styles.item} ${styles.active}`
              : styles.item
          }
          active={type.id === device.selectedType?.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
})

export default TypeBar
