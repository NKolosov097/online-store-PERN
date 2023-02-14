import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'

export const TypeBar = observer(() => {
    const { device } = useContext(Context)

  return (
    <ListGroup>
      {device.types.map(type => 
        <ListGroup.Item 
            style={{ cursor: 'pointer' }}
            active={type.id === device.selectedType.id}
            onClick={() => device.selectedType(type)}
            key={type.id}
        >
            {type.name}
        </ListGroup.Item>  
      )}
    </ListGroup>
  )
})
