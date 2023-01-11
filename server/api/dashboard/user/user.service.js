//Use database connection
const pool = require("../../../config/database");

module.exports = {
  //Create new user
  create: (data, callBack) => {
    pool.query(
      `insert into users(user_login,password,email,email_verification,user_nicename,user_status,image,user_url,role,display_name,created_at)
   values(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.user_login,
        data.password,
        data.email,
        data.email_verification,
        data.user_nicename,
        data.user_status,
        data.image,
        data.user_url,
        data.role,
        data.display_name,
        data.created_at,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Get all users
  getUsers: (callBack) => {
    pool.query(
      `select id,user_login,password,user_nicename,email,email_verification,user_url,user_status,role,display_name,created_at,updated_at from users ORDER BY ID DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // Get user by ID
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select * from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update user by ID
  updateUser: (data, callBack) => {
    pool.query(
      `update users set user_login=?,password= COALESCE(NULLIF(?, ''), password),user_nicename=?,email=?,email_verification=?,user_url=?,user_status=?,image= COALESCE(NULLIF(?, ''), image),role=?,display_name=?,updated_at=? where ID = ?`,
      [
        data.user_login,
        data.password,
        data.user_nicename,
        data.email,
        data.email_verification,
        data.user_url,
        data.user_status,
        data.image,
        data.role,
        data.display_name,
        data.updated_at,
        data.ID,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Update Profile vatar
  updateUserProfile: (data, callBack) => {
    pool.query(
      `update users set image= COALESCE(NULLIF(?, ''), image) where ID = ?`,
      [data.image, data.ID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //Delete user by ID
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM users WHERE ID = ?`,
      [data.ID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // Get user by email
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
