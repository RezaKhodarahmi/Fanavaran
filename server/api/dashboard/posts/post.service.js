//Use database connection
const pool = require("../../../config/database");

module.exports = {
  getPosts: (callBack) => {
    pool.query(`SELECT * FROM blog`, (error, results, fields) => {
      if (error) {
        return callBack(error);
      }

      return callBack(null, results);
    });
  },
  create: (data, image, callBack) => {
    pool.query(
      `INSERT INTO blog (authorId,parentId,title,metaTitle,keyword,slug,summary,
        published,created_at,content,image) values(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.authorId,
        data.parentId,
        data.title,
        data.metaTitle,
        data.keyword,
        data.slug,
        data.summary,
        data.published,
        data.created_at,
        data.content,
        image,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  update: (data, image, callBack) => {
    pool.query(
      `UPDATE blog set authorId=?,parentId=?,title=?,metaTitle=?,keyword=?,slug=?,summary=?,published=?,updated_at=?,content =?,image= ? WHERE id = ?`,
      [
        data.authorId,
        data.parentId,
        data.title,
        data.metaTitle,
        data.keyword,
        data.slug,
        data.summary,
        data.published,
        data.created_at,
        data.content,
        image,
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
  single: (id, callBack) => {
    pool.query(
      `SELECT * FROM blog WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deletePostWithId: (data, callBack) => {
    pool.query(
      `DELETE FROM blog WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  postCategory: (data ,callBack) => {
    pool.query(
      `INSERT INTO blog_post_category(postId,categoryId) values ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  postTag: (data ,callBack) => {
    pool.query(
      `INSERT INTO blog_post_tag(postId,tagId) values ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
