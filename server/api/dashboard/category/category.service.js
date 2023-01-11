//Use database connection
const pool = require("../../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO categories(parentId,title,metaTitle,slug,content) values(?,?,?,?,?) `,
      [data.parentId, data.title, data.metaTitle, data.slug, data.content],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  //Get all categorys
  getCategories: (callBack) => {
    pool.query(
      `select * from categories ORDER BY ID DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // Get category by ID
  getCategoryByCategoryId: (id, callBack) => {
    pool.query(
      `select * from categories where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update category by ID
  updateCategory: (data, callBack) => {
    pool.query(
      `update categories set parentId=?,title=?,metaTitle=?,slug=?,content=? where id = ?`,
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

  //Delete category by ID
  deleteCategory: (data, callBack) => {
    pool.query(
      `DELETE FROM categories WHERE id = ?`,
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
