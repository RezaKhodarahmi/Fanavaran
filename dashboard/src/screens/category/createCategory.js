import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { Editor } from "@tinymce/tinymce-react";
import Success from "../../components/messages/success";
import Danger from "../../components/messages/Danger";
import { createCategory } from "../../actions/categoryActions";
import env from "react-dotenv";
import currentDate from "../../components/tools/currentDate";

const CreateCourse = () => {
  const { t } = useTranslation();
  const createForm = useRef();
  const dispatch = useDispatch();

  var { success, err, id } = useSelector((state) => state.newCategory);
  //Convert data to an Object

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  //Set initial State
  const initialState = {
    title: "",
    slug: "",
    metaTitle: "",
    content: "",
    parentId: null,
  };
  const [content, setContent] = useState();
  //Use state to change form values
  const [formValues, setFormValues] = useState(initialState);
  //Set validation errors
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //Send form to databace
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createCategory(formValues, token));
    }
  }, [formErrors]);

  //Handel form inputs changes
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
    setDescription(e.target.getContent());
  };
  //Handel Submit
  const handelUpdate = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (valuses) => {
    const errors = {};
    const regSlug = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;

    if (!valuses.title) {
      errors.title = t("title-required");
    }
    if (!valuses.slug) {
      errors.slug = t("slug-required");
    } else if (!regSlug.test(valuses.slug)) {
      errors.slug = "Only A-z 0-9 character";
    }
    return errors;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>{t("category-create")}</h1>
          <Form ref={createForm} onSubmit={handelUpdate}>
            <div className="row">
              <div className="col-12 px-5 d-inline-block">
                <Form.Label htmlFor="title">{t("title")}</Form.Label>
                <Form.Control
                  className={formErrors.title ? "is-invalid" : ""}
                  id="title"
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handelChange}
                />
                <span className="validate-error">{formErrors.title}</span>
              </div>
              <div className="col-12 px-5 d-inline-block">
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
                  className={formErrors.slug ? "is-invalid" : ""}
                  id="slug"
                  type="text"
                  name="slug"
                  value={formValues.slug}
                  onChange={handelChange}
                />
                <span className="validate-error">{formErrors.slug}</span>
              </div>
              <div className="col-12 px-5 d-inline-block mb-5">
                <Editor
                  name="content"
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
            <div className="col-12 px-5 d-inline-block">
              <Form.Label htmlFor="metaTitle">{t("meta-title")}</Form.Label>
              <Form.Control
                className={formErrors.metaTitle ? "is-invalid" : ""}
                id="metaTitle"
                type="text"
                name="metaTitle"
                value={formValues.metaTitle}
                onChange={handelChange}
              />
              <span className="validate-error">{formErrors.metaTitle}</span>
            </div>
            <div className="col-12 px-5 d-inline-block">
              <button className="btn btn-primary " type="submit">
                {t("submit")}
              </button>
            </div>
          </Form>
        </div>
      </div>
      {success ? <Success message="Category created successfully!" /> : null}
      {err ? <Danger message={err} /> : null}
    </div>
  );
};

export default CreateCourse;
