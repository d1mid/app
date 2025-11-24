import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../main'
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
  const { device } = useContext(Context)!;
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages: number[] = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <Pagination>
        {pages.map(page => (
          <Pagination.Item
            key={page}
            active={device.page === page}
            onClick={() => device.setPage(page)}
            style={device.page === page ? { backgroundColor: "#3399cc", color: "white" } : undefined}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  )
})

export default Pages;

