//  Mysql connection
const pool = require("../../../config/database");

module.exports = {
  //  Create new meta
  create: (data, id, callBack) => {
    //  Check if user meta already exists
    pool.query(
      `SELECT * FROM usermeta WHERE user_id= ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        //  If user meta doesn't exists
        if (results && results.length === 0) {
          pool.query(
            `INSERT INTO usermeta(user_id,meta_key,meta_value) values ?`,
            [data],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              return callBack(null, results);
            }
          );
        } else {
          //  If user meta already exists
          return callBack(null, 0);
        }
      }
    );
  },
  //   Get user meta by ID
  getUserMeta: (id, callBack) => {
    pool.query(
      `SELECT user_id,meta_key,meta_value FROM usermeta WHERE user_id = ? `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //   Update user meta by id and meta_key
  updateUserMeta: (data, callBack) => {
    pool.query(
      `UPDATE usermeta SET meta_key=?,meta_value=? WHERE user_id = ? AND meta_key = ?`,
      [data.meta_key, data.meta_value, data.user_id, data.meta_key],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //   Delete user meta
  deleteUserMeta: (id, callBack) => {
    pool.query(
      `DELETE FROM usermeta WHERE user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
