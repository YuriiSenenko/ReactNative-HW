import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  login: Yup.string()
    .matches(/\S{3,}/, "Name too short (min 3)")
    .matches(
      /((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/,
      "Name must includes only Latin alphabet"
    )
    .required("Require field"),
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, "Email must be without spaces")
    .matches(/\S{7,}/, "Email too short (min 7 symbols)")
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      "Invalid email"
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      "Dashes should only be inside email"
    )
    .required("Require field"),
  password: Yup.string()
    .min(7, "Password too short (min 7)")
    .max(32, "Password too long (max 32)")
    .matches(/^\s*\S+\s*$/, "Password must be without spaces")
    .required("Require field"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, "Email must be without spaces")
    .matches(/\S{7,}/, "Email too short (min 7 symbols)")
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      "Invalid email"
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      "Dashes should only be inside email"
    )
    .required("Require"),
  password: Yup.string()
    .min(7, "Password too short (min 7)")
    .max(32, "Password too long (max 32)")
    .matches(/^\s*\S+\s*$/, "Password must be without spaces")
    .required("Require"),
});

export { registerSchema, loginSchema };
