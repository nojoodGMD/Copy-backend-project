import { check } from "express-validator";

// export const categoryValidator = () => {
//     return [check("id").isNumeric().withMessage("Product ID must be a number")];
//   };
  
  export const validateCreateCategory = [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Category Name is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("Category Name should be 3-100 characters long"),
  ];
  
  export const validateUpdateCategory = [
    check("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Category Name is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("Category Name should be 3-100 characters long"),
    
  ];
  