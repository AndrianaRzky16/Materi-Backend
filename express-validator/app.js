import express from "express";
import { body, query, validationResult } from "express-validator";

const app = express();

app.use(express.json());

const parsesErrors = (errorsArray) => {
  return errorsArray.map((error) => ({
    param: error.param,
    message: error.msg,
  }));
};

app.get("/", query("person").notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array() });
  }

  res.json({ message: `Hello ${req.query.person}` });
});

app.post(
  "/register",
  [
    body("email").notEmpty().isEmail().withMessage("Invalid Email"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 character long"),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords does not match");
      }
      return true;
    }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json(parsesErrors(result.array()));
    }
    res.json({
      message: "User registered successfully!",
      token: "SECRET_TOKEN",
    });
  }
);

// const authValidator = () => {
//   return [
//     body("email").notEmpty().isEmail(),
//     body("password").notEmpty().isLength({ min: 8 }),
//   ];
// };

// app.post("/login", authValidator(), (req, res) => {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     return res.status(422).json({ errors: result.array() });
//   }
//   res.json({
//     message: "Login Berhasil",
//     token: "secret_token",
//   });
// });

export default app;
