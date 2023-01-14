import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { Editor } from "@tinymce/tinymce-react";
import Success from "../../components/messages/success";
import Danger from "../../components/messages/Danger";
import { createCourse } from "../../actions/courseActions";
import env from "react-dotenv";
import currentDate from "../../components/tools/currentDate";
import Content from "../../components/courses/Content";
import { getAllCategories } from "../../actions/categoryActions";
import PostCategories from "../../components/posts/Categories";
import { getInstractors } from "../../actions/userActions";
const CreateCourse = () => {
  const { t } = useTranslation();
  const createForm = useRef();
  const dispatch = useDispatch();

  var { success, err, id } = useSelector((state) => state.newCourse);
  var { instructors } = useSelector((state) => state.instructors);


  //Convert data to an Object

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  //Set initial State
  const initialState = {
    title: "",
    slug: "",
    description: "",
    regular_price: "0",
    member_price: "0",
    status: 1,
    type: 1,
    rate: 1,
    imgage: null,
    retake: 1,
    accessable_lifetime: 365,
    start_date: "",
    end_date: "",
    members_access: 100,
    duration_info: "",
    instructor: null,
    created_at: currentDate,
  };
  const [description, setDescription] = useState();
  //Use state to change form values
  const [formValues, setFormValues] = useState(initialState);
  //Use state to change course image
  const [images, setImage] = useState([]);
  //Use state to change course url
  const [imageUrl, setImageUrl] = useState([]);
  //Set validation errors
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //Send form to databace
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      var formData = new FormData(createForm.current);
      formData.append("image", formValues.imgage);
      dispatch(createCourse(formData, token));
    }
  }, [formErrors]);
  useEffect(() => {
    dispatch(getAllCategories(token));
    dispatch(getInstractors(token));
  }, []);
  const { allCategories } = useSelector((state) => state.categories);
  //Chenge image url
  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImageUrl(newImageURLs);
  }, [images]);
  //Handel course image change
  const onImageChange = (e) => {
    setImage([...e.target.files]);
  };
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
  const handelDescription = (e) => {
    setFormValues((formValues) => {
      return {
        ...formValues,
        description: e.target.getContent(),
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
    const regNumber = /^\d+$/;
    const regPrice = /^[+-]?\d+(\.\d+)?$/;
    const regSlug = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;

    if (!valuses.title) {
      errors.title = t("title-required");
    }
    if (!valuses.slug) {
      errors.slug = t("title-required");
    } else if (!regSlug.test(valuses.slug)) {
      errors.slug = "Only A-z 0-9 character";
    }
    if (!valuses.regular_price) {
      errors.regular_price = "Regular Price is required, For free put 0";
    } else if (!regPrice.test(valuses.regular_price)) {
      errors.regular_price = "Invalid price! only 0-9. EXP: 99.00 or 99";
    } else if (valuses.regular_price < 0) {
      errors.regular_price = "Only 0 and above";
    }
    if (!valuses.member_price) {
      errors.member_price = "Regular Price is required, For free put 0";
    } else if (!regPrice.test(valuses.member_price)) {
      errors.member_price = "Invalid price! only 0-9. EXP: 99.00 or 99";
    } else if (valuses.member_price < 0) {
      errors.member_price = "Only 0 and above";
    }
    if (!valuses.retake) {
      errors.retake = "Reteke is required! Default is 0";
    } else if (!regNumber.test(valuses.retake)) {
      errors.retake = "Only 0 and above";
    } else if (valuses.retake < 0) {
      errors.retake = "Only 0 and above";
    }
    if (!valuses.type) {
      errors.type = "Type is required! Default is 1";
    } else if (valuses.type < 1 || valuses.type > 2) {
      errors.type = "Only Number 1 or 2";
    }
    if (!valuses.accessable_lifetime) {
      errors.accessable_lifetime = "Accessable lifetime is require";
    } else if (!regNumber.test(valuses.accessable_lifetime)) {
      errors.accessable_lifetime = "Only 0 and above";
    } else if (valuses.accessable_lifetime < 0) {
      errors.accessable_lifetime = "Only 0 and above";
    }
    if (!valuses.members_access) {
      errors.members_access =
        "Allowed number of registrations is required. 0 for unlimited";
    } else if (!regNumber.test(valuses.members_access)) {
      errors.members_access = "Only 0 and above";
    } else if (valuses.members_access < 0) {
      errors.members_access = "Only 0 and above";
    }
    return errors;
  };
  const [fakeSuccess, setFakeSuccess] = useState(null);
  const HandelContent = (e) => {
    e.preventDefault();
    setFakeSuccess("Updated successfully");
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>{t("course-create")}</h1>
          <Form
            ref={createForm}
            onSubmit={handelUpdate}
            enctype="multipart/form-data"
          >
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
                  name="description"
                  apiKey={env.TINYMCE_KEY}
                  init={{
                    selector: "textarea",
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | blocks| bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  onChange={handelDescription}
                  initialValue={formValues.description}
                />
                <textarea
                  style={{ display: "none" }}
                  name="description"
                  value={description}
                ></textarea>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="regular_price">
                  {t("regular_price")}
                </Form.Label>
                <Form.Control
                  className={formErrors.regular_price ? "is-invalid" : ""}
                  id="regular_price"
                  type="number"
                  step=".01"
                  min="0"
                  name="regular_price"
                  value={formValues.regular_price}
                  onChange={handelChange}
                />
                <span className="validate-error">
                  {formErrors.regular_price}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="member_price">
                  {t("member_price")}
                </Form.Label>
                <Form.Control
                  className={formErrors.member_price ? "is-invalid" : ""}
                  id="member_price"
                  type="number"
                  step=".01"
                  min="0"
                  name="member_price"
                  value={formValues.member_price}
                  onChange={handelChange}
                />
                <span className="validate-error">
                  {formErrors.member_price}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="status">{t("status")}</Form.Label>
                <Form.Select
                  className={formErrors.status ? "is-invalid" : ""}
                  id="status"
                  name="status"
                  value={formValues.status}
                  onChange={handelChange}
                >
                  <option value="0">{t("not-active")}</option>
                  <option value="1">{t("active")}</option>
                </Form.Select>
                <span className="validate-error">{formErrors.status}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="type">{t("type")}</Form.Label>
                <Form.Select
                  className={formErrors.type ? "is-invalid" : ""}
                  id="type"
                  name="type"
                  value={formValues.type}
                  onChange={handelChange}
                >
                  <option value="1">{t("online")}</option>
                  <option value="2">{t("recorded")}</option>
                </Form.Select>
                <span className="validate-error">{formErrors.type}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="retake">{t("retake")}</Form.Label>
                <Form.Control
                  className={formErrors.retake ? "is-invalid" : ""}
                  id="retake"
                  type="number"
                  min="0"
                  name="retake"
                  value={formValues.retake}
                  onChange={handelChange}
                />
                <span className="validate-error">{formErrors.retake}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="accessable_lifetime">
                  {t("accessable_lifetime")}
                </Form.Label>
                <Form.Control
                  className={formErrors.accessable_lifetime ? "is-invalid" : ""}
                  id="accessable_lifetime"
                  type="number"
                  min="0"
                  name="accessable_lifetime"
                  value={formValues.accessable_lifetime}
                  onChange={handelChange}
                />
                <span className="validate-error">
                  {formErrors.accessable_lifetime}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="start_date">{t("start_date")}</Form.Label>
                <Form.Control
                  className={formErrors.start_date ? "is-invalid" : ""}
                  id="start_date"
                  type="date"
                  name="start_date"
                  value={formValues.start_date}
                  onChange={handelChange}
                />
                <span className="validate-error">{formErrors.start_date}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="end_date">{t("end_date")}</Form.Label>
                <Form.Control
                  className={formErrors.end_date ? "is-invalid" : ""}
                  id="end_date"
                  type="date"
                  name="end_date"
                  value={formValues.end_date}
                  onChange={handelChange}
                />
                <span className="validate-error">{formErrors.end_date}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="members_access">
                  {t("members_access")}
                </Form.Label>
                <Form.Control
                  className={formErrors.members_access ? "is-invalid" : ""}
                  id="members_access"
                  type="number"
                  min="0"
                  name="members_access"
                  value={formValues.members_access}
                  onChange={handelChange}
                />
                <span className="validate-error">
                  {formErrors.members_access}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="duration_info">
                  {t("duration_info")}
                </Form.Label>
                <Form.Control
                  className={formErrors.duration_info ? "is-invalid" : ""}
                  id="duration_info"
                  type="text"
                  name="duration_info"
                  value={formValues.duration_info}
                  onChange={handelChange}
                />
                <span className="validate-error">
                  {formErrors.duration_info}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="instructor">{t("instructor")}</Form.Label>
                <Form.Select
                  className={formErrors.instructor ? "is-invalid" : ""}
                  id="instructor"
                  name="instructor"
                  value={formValues.instructor}
                  onChange={handelChange}
                >
                  {instructors?.map((instructor, index) => (
                    <option key={instructor.ID} value={instructor.ID}>
                      {instructor.display_name}
                    </option>
                  ))}
                 
                </Form.Select>
                <span className="validate-error">{formErrors.instructor}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="rate">{t("rate")}</Form.Label>
                <Form.Control
                  className={formErrors.rate ? "is-invalid" : ""}
                  id="rate"
                  type="number"
                  name="rate"
                  max="5"
                  min="0"
                  value={formValues.rate}
                  onChange={handelChange}
                />
                <span className="validate-error">{formErrors.rate}</span>
              </div>

              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <Form.Label htmlFor="image">{t("image")}</Form.Label>
                <Form.Control
                  className={formErrors.image ? "is-invalid" : ""}
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={onImageChange}
                />
                <span className="validate-error">{formErrors.image}</span>
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block mb-5">
                <Form.Label htmlFor="category">{t("category")}</Form.Label>
                <PostCategories categories={allCategories} />
                {/* <span className="validate-error">{formErrors.published}</span> */}
              </div>
              <div className="col-md-6 col-sm-12 px-5 d-inline-block">
                <img src={imageUrl} alt={formValues.title} width="200"></img>
              </div>
            </div>
            <div className="col-12 px-5 d-inline-block">
              <input type="hidden" name="id" value={formValues.id} />
              <button className="btn btn-primary " type="submit">
                {t("submit")}
              </button>
            </div>
          </Form>

          <div className="row  mt-5 course_content_sec course_content_sec">
            <Form onSubmit={HandelContent}>
              <Content />
              <div className="col-12">
                <button className="btn btn-primary btn-sm">
                  {t("update")}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {success ? <Success message="Course updated successfully!" /> : null}
      {fakeSuccess ? <Success message="Course updated successfully!" /> : null}
      {err ? <Danger message={err.message} /> : null}
    </div>
  );
};

export default CreateCourse;
