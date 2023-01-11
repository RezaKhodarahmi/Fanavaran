import React from "react";
import Select from "react-select";


const Categories = (props) => {
  const options = [
    props.categories?.map((item) => ({ value: item.id, label: item.title })),
  ];

  return (
    <>
      <Select
        options={options[0]}
        isMulti
        name="category"
        styles={{
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "#f5f5f5",
            color: "black",
          }),
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "#283046",
            backgroundColor:"silver"
          }),
        }}
      />
    </>
  );
};

export default Categories;
