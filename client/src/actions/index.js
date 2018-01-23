import axios from 'axios';

export const fetchCities = async () => {
  const cities = [];
  fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then(blob => blob.json())
    .then(data => cities.push(...data));
  return cities
}

export const fetchLocation  = async (city, state) => {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=AIzaSyAB8gfy6Sx88jyTuVyKzEGdfz2HBIPPSwY`);
  return res.status === 200 ? res.data.results[0].geometry.location : 'sorry, it was not found';
}
export const fetchResults = async (location) => {
  const res = await axios.post('http://localhost:5151/beer', location);
  return res.data.data;
}
export const fetchHikingTrails = async (location) => {
  const res = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${location.lat}&lon=${location.lng}&maxDistance=25&key=200209504-a26274125febfc3d1f114728434728a1`)
  return res.data.trails;
}
export const fetchMTBTrails = async (location) => {
  const res = await axios.get(`https://www.mtbproject.com/data/get-trails?lat=${location.lat}&lon=${location.lng}&maxDistance=25&key=200209504-a26274125febfc3d1f114728434728a1`)
  return res.data.trails;
}
export const fetchTrailrunTrails = async (location) => {
  const res = await axios.get(`https://www.trailrunproject.com/data/get-trails?lat=${location.lat}&lon=${location.lng}&maxDistance=25&key=200209504-a26274125febfc3d1f114728434728a1`)
  return res.data.trails;
}
export const fetchSkiTrails = async (location) => {
  const res = await axios.get(`https://www.powderproject.com/data/get-trails?lat=${location.lat}&lon=${location.lng}&maxDistance=25&key=200209504-a26274125febfc3d1f114728434728a1`)
  return res.data.trails;
}

export const abbrState = (input, to) => {
  const states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
  ];
  if (to === 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for(let i = 0; i < states.length; i++){
          if(states[i][0] === input){
              return(states[i][1]);
          }
      }    
  } else if (to === 'name'){
      input = input.toUpperCase();
      for(let i = 0; i < states.length; i++){
          if(states[i][1] === input){
              return(states[i][0]);
          }
      }    
  }
}