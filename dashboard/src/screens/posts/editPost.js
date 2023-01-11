import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { Editor } from "@tinymce/tinymce-react";
import Success from "../../components/messages/success";
import Danger from "../../components/messages/Danger";
import currentDate from "../../components/tools/currentDate";
import env from "react-dotenv";
import PostCategories from "../../components/posts/Categories";
import PostTags from "../../components/posts/Tags";
import { createPostAction } from "../../actions/postsAction";
import { getTags } from "../../actions/postTagsAction";
import { getCategories } from "../../actions/postsCategoryAction";
import { getSinglePostAction } from "../../actions/postsAction";
import { useParams } from "react-router-dom";

export default function createPost() {
  const { id } = useParams();
  const authorId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null;
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags(token));
    dispatch(getCategories(token));
    dispatch(getSinglePostAction(id, token));
  }, []);
  const { data } = useSelector((state) => state.singlePost);
  //Convert data to an Object
  const postData = Object(data);

  const { success, err } = useSelector((state) => state.postNew);
  //State
  const initialState = {
    title: "",
    slug: "",
    authorId: authorId,
    metaTitle: "",
    summary: "",
    published: 1,
    content: "",
    created_at: currentDate,
  };
  const { tags } = useSelector((state) => state.postTag);
  const { categories } = useSelector((state) => state.postCategory);

  const [formValues, setFormValues] = useState(initialState);
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  useEffect(() => {
    setFormValues((formValues) => {
      return {
        ...formValues,
        title: postData[0]?.title,
        slug: postData[0]?.slug,
        authorId: postData[0]?.authorId,
        metaTitle: postData[0]?.metaTitle,
        summary: postData[0]?.summary,
        published: postData[0]?.published,
        content: postData[0]?.content,
        keyword: postData[0]?.keyword,
      };
    });
  }, [data]);
  //Use Translate
  const { t } = useTranslation();
  //Use ref
  const createForm = useRef();
  //Handel inputs update
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => {
      return {
        ...formValues,
        [name]: value,
      };
    });
  };
  //Handel form description input
  const handelContent = (e) => {
    setFormValues((formValues) => {
      return {
        ...formValues,
        content: e.target.getContent(),
      };
    });
    setContent(e.target.getContent());
  };
  //Handele form submite
  const handelUpdate = (e) => {
    e.preventDefault();
    var formData = new FormData(createForm.current);
    dispatch(createPostAction(formData, token));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>{t("post-edit")}</h1>
          <Form
            ref={createForm}
            onSubmit={handelUpdate}
            enctype="multipart/form-data"
          >
            <div className="row">
              <div className="col-md-12 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="title">{t("title")}</Form.Label>
                <Form.Control
                  //   className={formErrors.regular_price ? "is-invalid" : ""}
                  id="title"
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handelChange}
                />
                <span className="validate-error">
                  {/* {formErrors.regular_price} */}
                </span>
              </div>
              <div className="col-12 px-5 d-inline-block mb-5">
                <Form.Label htmlFor="slug">
                  {t("slug")}:
                  <a
                    href={env.FRONT_URL + "/" + formValues.slug}
                    target="__blank"
                  >
                    {env.FRONT_URL + "/" + formValues.slug}
                  </a>
                </Form.Label>
                <Form.Control
                  //   className={formErrors.slug ? "is-invalid" : ""}
                  id="slug"
                  type="text"
                  name="slug"
                  value={formValues.slug}
                  onChange={handelChange}
                />
                {/* <span className="validate-error">{formErrors.slug}</span> */}
              </div>

              <div className="col-md-12 col-sm-12 px-5 d-inline-block">
                <Editor
                  name="description"
                  apiKey={env.TINYMCE_KEY}
                  init={{
                    selector: "textarea",
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | blocks| bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  onChange={handelContent}
                  initialValue={formValues.content}
                />
                <textarea
                  style={{ display: "none" }}
                  name="content"
                  value={content}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="category">{t("category")}</Form.Label>
              <PostCategories categories={categories} />
              {/* <span className="validate-error">{formErrors.published}</span> */}
            </div>
            <div className="col-md-6 col-sm-12 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="tags">{t("tags")}</Form.Label>
              <PostTags tags={tags} />
              {/* <span className="validate-error">{formErrors.published}</span> */}
            </div>
            <div className="col-md-6 col-sm-12 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="status">{t("published")}</Form.Label>
              <Form.Select
                // className={formErrors.published ? "is-invalid" : ""}
                id="published"
                name="published"
                value={formValues.published}
                onChange={handelChange}
              >
                <option value="0">{t("Draft")}</option>
                <option value="1">{t("published")}</option>
              </Form.Select>
              {/* <span className="validate-error">{formErrors.published}</span> */}
            </div>
            <div className="col-md-6 col-sm-12 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="image">{t("image")}</Form.Label>
              <Form.Control
                // className={formErrors.image ? "is-invalid" : ""}
                id="image"
                type="file"
                name="image"
                accept="image/*"
                // onChange={onImageChange}
              />
              {/* <span className="validate-error">{formErrors.image}</span> */}
            </div>
            <div className="col-sm-12 col-md-6 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="metaTitle">{t("meta-title")}</Form.Label>
              <Form.Control
                //   className={formErrors.slug ? "is-invalid" : ""}
                id="metaTitle"
                type="text"
                name="metaTitle"
                value={formValues.metaTitle}
                onChange={handelChange}
              />
              {/* <span className="validate-error">{formErrors.slug}</span> */}
            </div>
            <div className="col-sm-12 col-md-6 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="keyword">{t("keyword")}</Form.Label>
              <Form.Control
                //   className={formErrors.slug ? "is-invalid" : ""}
                id="keyword"
                type="text"
                name="keyword"
                value={formValues.keyword}
                onChange={handelChange}
              />
              {/* <span className="validate-error">{formErrors.slug}</span> */}
            </div>
            <div className="col-12 px-5 d-inline-block mb-5">
              <Form.Label htmlFor="summary">{t("summary")}</Form.Label>
              <textarea
                //   className={formErrors.slug ? "is-invalid" : ""}
                id="summary"
                type="text"
                name="summary"
                className="form-control"
                value={formValues.summary}
                onChange={handelChange}
              ></textarea>
              {/* <span className="validate-error">{formErrors.slug}</span> */}
            </div>
            <input type="hidden" name="authorId" value={authorId} />
            <input type="hidden" name="created_at" value={currentDate} />
            <div className="col-12 px-5 d-inline-block">
              <button className="btn btn-primary " type="submit">
                {t("update")}
              </button>
            </div>
          </Form>
        </div>
      </div>
      {success ? <Success message="Post created successfully!" /> : null}
      {err ? <Danger message={err.message} /> : null}
    </div>
  );
}
