const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(user_login,password,email,email_verification,display_name,created_at)
            values(?,?,?,?,?,?)`,
      [
        data.user_login,
        data.password,
        data.email,
        data.email_verification,
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

  getUsers: (callBack) => {
    pool.query(
      `select id,user_login,password,user_nicename,email,user_url,user_status,role,display_name,created_at from users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,user_login,password,user_nicename,email,user_url,user_status,role,display_name,created_at from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set user_login=?,password=?,user_nicename=?,email=?,email_verification=?,user_url=?,user_status=?,role=?,display_name=?,updated_at=?,updated_at=? where id = ?`,
      [
        data.user_login,
        data.password,
        data.user_nicename,
        data.email,
        data.email_verification,
        data.user_url,
        data.user_status,
        data.role,
        data.display_name,
        data.created_at,
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
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
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
