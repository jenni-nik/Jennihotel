let hotels = [
    { id: 1, name: "Grand Hotel", location: "New York", price: 150 },
    { id: 2, name: "Ocean View", location: "California", price: 200 },
    { id: 3, name: "Mountain Inn", location: "Colorado", price: 120 }
  ];
  
  module.exports = hotels;
 
const hotel = model('Hotel', hotelSchema);
export default hotel;