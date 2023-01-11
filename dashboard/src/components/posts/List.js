import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/postsAction";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; 
// Import
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
  //Get all Posts
  useEffect(() => {
    dispatch(getPosts(token));
  }, []);
  const { data } = useSelector((state) => state.posts);

  const [newPostData, setnewPostData] = useState();
  useEffect(() => {
    setnewPostData(data);
  }, [data]);

  //create a new array by filtering the original array
  const filteredData = newPostData?.filter((el) => {
    //if no input the return the original
    if (props.search === "") {
      return el;
    }

    const filtered =
      el.title?.toLowerCase().trim().includes(props.search) ||
      el.slug?.toLowerCase().trim().includes(props.search);
    if (filtered) {
      return filtered;
    }
  });

  const deleteHandler = (id) => {
    confirmAlert({
      title: t("delete-post"),
      message: t("ask-delete-post"),
      buttons: [
        {
          label: t("yes"),
          onClick: () => {
            dispatch(deletePost(id, token));
            const arr = newPostData.filter((item) => item.id != id);
            setnewPostData(arr);
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
  const postsList = (data) => {
    return (
      <>
        {data?.map((post) => (
          <tr key={post.id}>
            <td width="10%">{post.id}</td>
            <td width="10%">{post.title}</td>
            <td width="10%">{post.slug}</td>
            <td width="10%">{post.published === 1 ? <span className="badge bg-success">Published</span>:<span className="badge bg-danger">Draft</span>}</td>
            <td width="10%">{post.created_at}</td>
            <td width="10%">{post.updated_at}</td>
            <td width="10%">
              <Link
                className="btn btn-success btn-sm"
                to={`/posts/edit/${post.id}`}
              >
                {t("edit")}
              </Link>
            </td>
            <td width="10%">
              <a
                className="btn btn-danger btn-sm"
                onClick={() => deleteHandler(post.id)}
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
      {postsList(currentItems)}
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
