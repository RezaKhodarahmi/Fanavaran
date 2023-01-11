//Use database connection
const pool = require("../../../config/database");

module.exports = {
  create: (data, image, callBack) => {
    pool.query(
      `INSERT INTO courses(title,slug,description,regular_price,member_price,status,type,img,retake,rate,accessable_lifetime,start_date,end_date,members_access,duration_info,created_at) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `,
      [
        data.title,
        data.slug,
        data.description,
        data.regular_price,
        data.member_price,
        data.status,
        data.type,
        image,
        data.retake,
        data.rate,
        data.accessable_lifetime,
        data.start_date,
        data.end_date,
        data.members_access,
        data.duration_info,
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
  //Get all courses
  getCourses: (callBack) => {
    pool.query(
      `select id,title,slug,description,regular_price,member_price,status,type,img,retake,rate,accessable_lifetime,start_date,end_date,members_access,duration_info,created_at,updated_at from courses ORDER BY ID DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // Get course by ID
  getCourseByCourseId: (id, callBack) => {
    pool.query(
      `select * from courses where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //Update course by ID
  updateCourse: (data, image, callBack) => {
    pool.query(
      `update courses set title=?,slug=?,description=?,regular_price=?,member_price=?,status=?,type=?,img=?,retake=?,rate=?,accessable_lifetime=?,start_date=?,end_date=?,members_access=?,duration_info=?,updated_at=? where id = ?`,
      [
        data.title,
        data.slug,
        data.description,
        data.regular_price,
        data.member_price,
        data.status,
        data.type,
        image,
        data.retake,
        data.rate,
        data.accessable_lifetime,
        data.start_date,
        data.end_date,
        data.members_access,
        data.duration_info,
        data.updated_at,
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

  //Delete course by ID
  deleteCoure: (data, callBack) => {
    pool.query(
      `DELETE FROM courses WHERE id = ?`,
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
