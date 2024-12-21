export const getLiveLocation = () => {
   return new Promise((resolve, reject) => {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           resolve({
             lat: position.coords.latitude,
             lng: position.coords.longitude,
           });
         },
         (error) => reject('Error fetching location')
       );
     } else {
       reject('Geolocation is not supported by this browser.');
     }
   });
 };
 