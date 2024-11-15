//connect with Redis and show error if connection fails
//create a 5 min cache i.e the VIN will be stored as string with 5 min expiration



const memjs = require('memjs');

// Connect to Memcached
const client = memjs.Client.create(process.env.MEMCACHED_URI);

// Cache utility function to store data with a 5-minute expiration
exports.cache = async (key, value) => {
  try {
    await client.set(key, JSON.stringify(value), { expires: 300 }); // 5 min expiration in seconds
  } catch (err) {
    console.error('Error caching data:', err);
  }
};

/*Retrieve data from cache
The getFromCache() function retrieves the cached data. If the data exists,
 it is parsed back to its original form using JSON.parse(data).
  If not, it returns null.
  */
  exports.getFromCache = async (key) => {
    try {
      const data = await client.get(key);
      return data.value ? JSON.parse(data.value.toString()) : null;
    } catch (err) {
      console.error('Error retrieving from cache:', err);
      return null;
    }
  };
