import { v4 as uuidv4 } from 'uuid';


// {topic, description, documenttype, uploadedby, date, }{event, description, date, uploadedby }
function createDocResources(form,fileAsset){
    const {topic, date, description, postedby, documenttype} = form;
    const   doc = {
            _id:uuidv4(),
            _type: 'bibleStudyUploads',
            topic,
            description,
            date,
            documenttype,
            uploadedBy: postedby,
            fileuploaded: {
              _type: 'file',
              _key: uuidv4(),
              asset: {
                _type: 'reference',
                _ref: fileAsset[0]?._id,
              },
            },            
          };

    return doc; 
}

function createDocPhotoGal(form,fileAsset){
    const photos = createPhotosArr(fileAsset);
    const {date, description, uploadedBy, event} = form;
    
    const   doc = {
            _id:uuidv4(),
            _type: "photoGallery",
            event,
            description,
            date,
            uploadedBy,
            photos:photos     
          };

    return doc; 
}

function createPhotosArr(fileAssets){
    const arrs = [];
    for(let i = 0; i < fileAssets.length; i++){
        const fileAsset = fileAssets[i];
        const doc = {
            _type: 'image',
            _key: uuidv4(),
            asset: {
                _type: 'reference',
                _ref: fileAsset?._id,
            },
        };
        arrs.push(doc);
    }
    return arrs;
}


export {createDocResources, createDocPhotoGal};




function createDocAdvertPhoto(form,fileAsset,){
    const {date, description, postedby, name} = form;
    const   doc = {
            _id:uuidv4(),
            _type: 'upcomingPrograme',
            name,
            description,
            date,
            uploadedBy: postedby,
            flyer: {
              _type: 'file',
              _key: uuidv4(),
              asset: {
                _type: 'reference',
                _ref: fileAsset?._id,
              },
            },            
          };
    return doc; 
}

function createDocAdvertVideo(form,fileAsset,){
    const {date, description, postedby, name} = form;
    const   doc = {
            _id:uuidv4(),
            _type: 'upcomingPrograme',
            name,
            description,
            date,
            uploadedBy: postedby,
            flyer: {
              _type: 'file',
              _key: uuidv4(),
              asset: {
                _type: 'reference',
                _ref: fileAsset?._id,
              },
            },            
          };
    return doc; 
}