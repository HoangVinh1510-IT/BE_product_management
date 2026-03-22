const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.router");
const productdRoutes = require("./product.router");
const productCategoryRoutes = require("./product-category.router");

module.exports = (app) =>{
    
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productdRoutes);
    app.use(PATH_ADMIN + "/products-category", productCategoryRoutes);

}