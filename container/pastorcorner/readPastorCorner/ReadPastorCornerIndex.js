import React from 'react'
import ContainerIndex from './components/_Container'

const ReadPastorCornerIndex = ({pastorCornerPhotos, pastorCornerSharePhotos, ssUser}) => {

  return (

    <div>
      <ContainerIndex pastorCornerPhotos={pastorCornerPhotos}
        pastorCornerSharePhotos={pastorCornerSharePhotos} ssUser={ssUser}/>
    </div>
  )
}

export default ReadPastorCornerIndex