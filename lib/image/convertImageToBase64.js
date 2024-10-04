'use client';

async function convertImageToBase64(input) {
    return new Promise((resolve, reject) => {
      // Check if the input is a file path (assuming it's a File object)
      if (input instanceof File) {
        const reader = new FileReader();
  
        reader.onloadend = function () {
          const base64String = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, part
          resolve(base64String);
        };
  
        reader.onerror = function (error) {
          reject('Error reading file: ' + error);
        };
  
        reader.readAsDataURL(input);
      } 
      // Check if the input is a URL
      if (typeof input === 'string') {
        fetch(input)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob();
          })
          .then(blob => {
            const reader = new FileReader();
  
            reader.onloadend = function () {
              const base64String = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, part
              resolve(base64String);
            };
  
            reader.onerror = function (error) {
              reject('Error reading blob: ' + error);
            };
  
            reader.readAsDataURL(blob);
          })
          .catch(error => {
            reject('Error fetching image: ' + error);
          });
      } else {
        reject('Invalid input. Input should be a File object or a string URL.');
      }
    });
  }
  
  /*/ Example usage with a file input element
  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    convertImageToBase64(file)
      .then(base64String => {
        console.log('Base64 from file:', base64String);
      })
      .catch(error => {
        console.error(error);
      });
  });*/

  
  // Example usage with a URL
  const imageUrl = 'https://media.istockphoto.com/id/1496615469/photo/serene-latin-woman-enjoy-sunset-with-gratitude.jpg?s=612x612&w=is&k=20&c=hrdwKW5CMjVXlB_k39AnXHb-_Bm4epQPXRRTxhCDQpc=';
  convertImageToBase64(imageUrl)
    .then(base64String => {
      console.log('Base64 from URL:', base64String);
    })
    .catch(error => {
      console.error(error);
    });
  