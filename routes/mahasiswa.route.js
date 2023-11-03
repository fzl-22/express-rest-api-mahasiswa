const express = require("express");

const mahasiswaControllers = require("../controllers/mahasiswa.controller");

const router = express.Router();

const { body } = require("express-validator");

router.get("/", mahasiswaControllers.getAllMahasiswa);

router.post(
  "/store",
  [
    body("nim").notEmpty(),
    body("nama").notEmpty(),
    body("jurusan").notEmpty(),
    body("asal_provinsi").notEmpty(),
  ],
  mahasiswaControllers.postSingleMahasiswa
);

router.get("/:id", mahasiswaControllers.getSingleMahasiswa);

router.patch(
  "/update/:id",
  [
    body("nama").notEmpty(),
    body("jurusan").notEmpty(),
    body("asal_provinsi").notEmpty(),
  ],
  mahasiswaControllers.updateSingleMahasiswa
);

router.delete("/delete/:id", mahasiswaControllers.deleteSingleMahasiswa);

module.exports = router;
