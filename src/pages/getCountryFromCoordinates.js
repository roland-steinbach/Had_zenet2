// src/utils/geocode.js
import axios from 'axios';

const OPEN_CAGE_API_KEY = '157b203335a543e18040da9c6b132e94';

const getCountryFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
    );

    if (response.data.results.length > 0) {
      const country = response.data.results[0].components.country;
      return country;
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching data from OpenCage API:', error);
    return null;
  }
};

export default getCountryFromCoordinates;
