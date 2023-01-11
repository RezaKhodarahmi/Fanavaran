import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../actions/userActions";
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
  //Get all users
  useEffect(() => {
    dispatch(getUsers(token));
  }, []);
  const { users } = useSelector((state) => state.users);
  const [newusers, setNewUsers] = useState();

  useEffect(() => {
    setNewUsers(users);
  }, [users]);

  //create a new array by filtering the original array
  const filteredData = newusers?.filter((el) => {
    //if no input the return the original
    if (props.search === "") {
      return el;
    }

    //Search filtering
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(props.search) === true) {
      return el.email.toLowerCase().trim().includes(props.search);
    }
    const filtered =
      el.user_login?.toLowerCase().trim().includes(props.search) ||
      el.user_nicename?.toLowerCase().trim().includes(props.search) ||
      el.display_name?.toLowerCase().trim().includes(props.search);
    if (filtered) {
      return filtered;
    }
  });

  const deleteHandler = (id) => {
    console.log(id);
    confirmAlert({
      title: t("delete-user"),
      message: t("ask-delete-user"),
      buttons: [
        {
          label: t("yes"),
          onClick: () => {
            dispatch(deleteUser(id, token));
            const arr = newusers.filter((item) => item.id != id);
            setNewUsers(arr);
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

  const userList = (data) => {
    return (
      <>
        {data?.map((user) => (
          <tr key={user.id}>
            <td width="10%">{user.id}</td>
            <td width="15%">{user.user_login}</td>
            <td width="15%">{user.email}</td>
            <td width="15%">{user.email_verification}</td>
            <td width="15%">{user.created_at}</td>
            <td width="15%">
              <Link
                className="btn btn-success btn-sm"
                to={`/user/edit/${user.id}`}
              >
                {t("edit")}
              </Link>
            </td>
            <td width="15%">
              <a
                className="btn btn-danger btn-sm"
                onClick={() => deleteHandler(user.id)}
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
      {userList(currentItems)}
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
