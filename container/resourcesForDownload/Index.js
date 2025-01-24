import React from 'react'
import Container from './components/Container';


const ResourcesIndex = ({siteResources}) => {

    return (
      <>
        <Container queryDownloads={siteResources}/>
      </>
  )
}

export default ResourcesIndex;



