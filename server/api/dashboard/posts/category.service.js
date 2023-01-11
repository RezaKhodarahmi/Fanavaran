//Use database connection
const pool = require("../../../config/database");

module.exports = {
  get: (callBack) => {
    pool.query(`SELECT * FROM blog_category`, (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO blog_category (parentId,title,metaTitle,slug,content) values(?,?,?,?,?)`,
      [data.parentId, data.title, data.metaTitle, data.slug, data.content],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  update: (data, callBack) => {
    pool.query(
      `UPDATE blog_category set parentId=?,title = ?,metaTitle = ?,slug = ?,content =? WHERE id = ?`,
      [
        data.parentId,
        data.title,
        data.metaTitle,
        data.slug,
        data.content,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  single: (data, callBack) => {
    pool.query(
      `SELECT * FROM blog_category WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteItem: (data, callBack) => {
    pool.query(
      `DELETE FROM blog_category WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
