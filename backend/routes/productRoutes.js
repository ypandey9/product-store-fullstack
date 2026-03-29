const express=require("express");
const router=express.Router();
const {getProducts,createProduct,updateProduct,deleteProduct}=require("../controllers/productController");
const auth=require("../middleware/authMiddleware");

router.get("/",auth,getProducts);
router.post("/",auth,createProduct);
// 🔥 ADD THESE
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports=router;