import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  login: Yup.string()
    .matches(/\S{3,}/, "Не меньше 3 літер")
    .matches(/((\s*[a-zA-Z]+\s*){2,}|[a-zA-Z]{2,})/, "Лише латинські літери")
    .required("Логін обов'язковий"),
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, "Email не повинен містити пробілів")
    .matches(/\S{7,}/, "Email не меньше 7 символів")
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      "Не правильний email"
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      "Тире має бути лише всередині електронної пошти"
    )
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(7, "Пароль не меньше 7 символів")
    .max(32, "Пароль не більше 32 символів")
    .matches(/^\s*\S+\s*$/, "Не повинен містити пробілів")
    .required("Пароль обов'язковий"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\s*\S+\s*$/, "Email не повинен містити пробілів")
    .matches(/\S{7,}/, "Email не меньше 7 символів")
    .matches(
      /^(?=.{7,63}$)([^а-яА-Я]+@([a-zA-Z]+\.)+[a-zA-z]{2,3})$/g,
      "Не правильний email"
    )
    .matches(
      /^[^-]+((.*[^-]))*@([a-zA-Z]+\.)+[a-zA-z]{2,3}$/g,
      "Тире має бути лише всередині електронної пошти"
    )
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(7, "Пароль не меньше 7 символів")
    .max(32, "Пароль не більше 32 символів")
    .matches(/^\s*\S+\s*$/, "Не повинен містити пробілів")
    .required("Пароль обов'язковий"),
});

export { registerSchema, loginSchema };
