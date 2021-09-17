const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  console.log(email)
  return pool
      .query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((result) => {
        console.log(result.rows);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  console.log(id)
  return pool
      .query(`SELECT * FROM users WHERE id = $1`, [id])
      .then((result) => {
        console.log(result.rows);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
 
  return pool
      .query(`INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
      .then((result) => {
        console.log(result.rows);
        return result.rows;
      })
      .catch((err) => {
        console.log("inside adduser",err.stack);
      });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  console.log('in reservations')
  return pool
  .query(`SELECT guest_id FROM reservations WHERE guest_id = $1 LIMIT $2`, [guest_id, limit])
  .then((result) => {
    console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(rating) as average_rating
    FROM properties
    JOIN property_reviews ON property_reviews.property_id = properties.id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id && options.city) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }
  if (options.owner_id && !options.city) {
    queryParams.push(parseInt(options.owner_id));
    queryString += `WHERE owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && (options.city || options.owner_id)) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryString += `AND cost_per_night > $${queryParams.length} `;
  }
  if (options.minimum_price_per_night && (!options.city && !options.owner_id)) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryString += `WHERE cost_per_night > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night && (options.city || options.owner_id || options.minimum_price_per_night)) {
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }
  if (options.maximum_price_per_night && (!options.city && !options.owner_id && !options.minimum_price_per_night)) {
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `WHERE cost_per_night < $${queryParams.length} `;
  }

  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += `HAVING avg(rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
`;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => err.stack);
}
exports.getAllProperties = getAllProperties;



/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  return pool
      .query(`INSERT INTO properties(title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,) RETURNING *;`, [property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code])
      .then((result) => {
        console.log(result.rows);
        return result.rows;
      })
      .catch((err) => {
        console.log("inside adduser",err.stack);
      });
}
exports.addProperty = addProperty;

/*fix get all propertys and add props*/