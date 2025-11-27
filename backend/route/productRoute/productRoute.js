let route = require("../../app");
const {createProduct,updateProduct,deleteProduct,getAllProducts} = require("../../controller/product/productController");

route.get("/get-all-products",getAllProducts);
route.post("/create-products",createProduct);
route.put("/update-products/:id",updateProduct);
route.delete("/delete-products/:id",deleteProduct);

module.exports = route;