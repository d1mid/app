import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../main'
import styles from './BrandBar.module.css'

const BrandBar = observer(() => {
  const { device } = useContext(Context)!;

  return (
    <div className={styles.grid} style={{maxHeight: 170, overflowY: 'auto'}}>
      {device.selectedBrand &&
        <div
          className={styles.resetTile}
          onClick={() => device.setSelectedBrand(undefined)}
          title="Сбросить фильтр по бренду"
        >
           Все бренды
        </div>
      }
      {device.brands.map(brand =>
        <div
          className={
            brand.id === device.selectedBrand?.id
              ? `${styles.tile} ${styles.tileSelected}`
              : styles.tile
          }
          key={brand.id}
          onClick={() => device.setSelectedBrand(brand)}
          title={brand.name}
        >
          <span className={styles.tileName}>{brand.name}</span>
        </div>
      )}
    </div>
  )
});

export default BrandBar
