
  export const upcomingProgQuery = () => {
    const query = `*[ _type == 'upcomingPrograme' ] | order(_createdAt desc){
        videoclip{
          asset->{
            url
          }
        },
        flyer{
            asset->{
              url
            }
          },
        _id,
        name,
        description,
        uploadedBy,
        date,
      }`;

    return query;
  };


  export const controlsQuery = () => {
    const query  = `*[ _type == 'controls' && title == 'Show Advert' ] | order(_createdAt desc){
        _id,
        date,
        title,  
        pass, 
        showcontainer, 
        showflyer, 
        showvideoclip, 
        setBy
      }`;

    return query;
  };


  export const bibleStudyUploadsQuery = () => {
    const query  = `*[ _type == 'bibleStudyUploads'] | order(_createdAt desc){
        fileuploaded{
            asset->{
              url
            }
          },
        _id,
        date, 
        topic, 
        documentId, 
        uploadedby, 
      }`;
      
    return query;
  };

  