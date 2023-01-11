import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourses, deleteCourse } from "../../actions/courseActions";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import

function List(props) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const dispatch = useDispatch();
  //Read auth Token
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  //Get all courses
  useEffect(() => {
    dispatch(getCourses(token));
  }, []);
  const { data } = useSelector((state) => state.courses);

  const [newCoursesData, setNewCoursesData] = useState();
  useEffect(() => {
    setNewCoursesData(data);
  }, [data]);

  //create a new array by filtering the original array
  const filteredData = newCoursesData?.filter((el) => {
    //if no input the return the original
    if (props.search === "") {
      return el;
    }

    const filtered =
      el.title?.toLowerCase().trim().includes(props.search) ||
      el.description?.toLowerCase().trim().includes(props.search) ||
      el.slug?.toLowerCase().trim().includes(props.search);
    if (filtered) {
      return filtered;
    }
  });

  const deleteHandler = (id) => {
    confirmAlert({
      title: t("delete-course"),
      message: t("ask-delete-course"),
      buttons: [
        {
          label: t("yes"),
          onClick: () => {
            dispatch(deleteCourse(id, token));
            const arr = newCoursesData.filter((item) => item.id != id);
            setNewCoursesData(arr);
          },
        },
        {
          label: t("no"),
          onClick: null,
        },
      ],
    });
  };
  //Filtering show number

  const courseList = (data) => {
    return (
      <>
        {data?.map((course) => (
          <tr key={course.id}>
            <td width="10%">{course.id}</td>
            <td width="10%">{course.title}</td>
            <td width="10%">{course.regular_price}</td>
            <td width="10%">{course.member_price}</td>
            <td width="10%">{course.status}</td>
            <td width="10%">{course.created_at}</td>
            <td width="10%">{course.slug}</td>
            <td width="10%">
              <Link
                className="btn btn-success btn-sm"
                to={`/course/edit/${course.id}`}
              >
                {t("edit")}
              </Link>
            </td>
            <td width="10%">
              <a
                className="btn btn-danger btn-sm"
                onClick={() => deleteHandler(course.id)}
              >
                {t("delete")}
              </a>
            </td>
          </tr>
        ))}
      </>
    );
  };
  const handelPaginate = (e) => {
    setCurrentPage(Number(e.target.id));
  };
  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredData?.length / props.showNumber);
    i++
  ) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * props.showNumber;
  const indexOfFirstItem = indexOfLastItem - props.showNumber;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handelPaginate}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handelNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handelPrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handelNextBtn}>&hellip;</li>;
  }
  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = <li onClick={handelPrevBtn}>&hellip;</li>;
  }
  return (
    <>
      {courseList(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handelPrevBtn}
            disabled={currentPage == pages[0] ? true : false}
            className="btn btn-primary btn-sm"
          >
            {t("prev")}
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handelNextBtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
            className="btn btn-primary btn-sm"
          >
            {t("next")}
          </button>
        </li>
      </ul>
    </>
  );
}

export default List;
