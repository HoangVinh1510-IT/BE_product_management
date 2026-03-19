const express = require("express");
const multer = require("multer");

const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware"); // ✅ sửa tên file

const storage = multer.memoryStorage();
const upload = multer({ storage });

// LIST
router.get("/", controller.index);

// CHANGE STATUS
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);

// DELETE
router.delete("/delete/:id", controller.deleteItem);

// CREATE
router.get("/create", controller.create);
router.post("/create",
  upload.single("thumbnail"),
  uploadCloud.upload,        // ✅ upload lên cloudinary
  controller.createPost      // ✅ lưu vào DB
);

// EDIT
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,        // ✅ thêm upload cloudinary cho edit
  controller.editPatch
);

// DETAIL
router.get("/detail/:id", controller.detail);

module.exports = router;