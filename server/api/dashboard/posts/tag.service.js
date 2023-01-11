//Use database connection
const pool = require("../../../config/database");

module.exports = {
  get: (callBack) => {
    pool.query(`SELECT * FROM blog_tag`, (error, results, fields) => {
      if (error) {
        return callBack(error);
      }

      return callBack(null, results);
    });
  },
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO blog_tag (title,metaTitle,slug,content) values(?,?,?,?)`,
      [data.title, data.metaTitle, data.slug, data.content],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
