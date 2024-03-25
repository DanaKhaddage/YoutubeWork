const express=require('express');
const router=express.Router();
const userController=require("../controllers/userController");
const productController=require("../controllers/productController");

router.post(
    "/create-product",
    userController.protect,
    productController.createProduct,
);

//patch:updates only the modified
router.patch(
    "/updateproduct/:productID",
    userController.protect,
    productController.createProduct,
);

router.delete(
    "/deleteproduct/:productID",
    userController.protect,
    productController.deleteProduct,
);

router.get(
    "/get-all-products",
    productController.getAllProducts,
);

module.exports = router;