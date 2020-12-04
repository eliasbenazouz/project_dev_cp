import expressValidator from "express-validator";
const { body, validationResult } = expressValidator;

const registerRules = () => [
  body("accountFirstName", "First name is required").notEmpty(),
  body("accountLastName", "Last name is required").notEmpty(),
  body("telephone", "Valid telephone number is required")
    .isMobilePhone()
    .isLength({
      min: 8,
      max: 20,
    }),
  body("email", "Email is required").isEmail(),
  body("password", "Password must contain at least 4 characters").isLength({
    min: 4,
    max: 20,
  }),
];

const loginRules = () => [
  body("email", "Email is required").isEmail(),
  body("password", "Password must contain at least 4 characters").isLength({
    min: 4,
    max: 20,
  }),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};

export { validator, registerRules, loginRules };
