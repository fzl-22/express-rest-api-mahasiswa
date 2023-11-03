const connection = require("../config/database.conf");
const { validationResult } = require("express-validator");

/**
 * GET ALL MAHASISWA
 */

function getAllMahasiswa(req, res) {
  connection.query(
    "SELECT * FROM mahasiswa ORDER BY nim DESC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      }

      return res.status(200).json({
        status: true,
        message: "List Data Mahasiswa",
        data: rows,
      });
    }
  );
}

/**
 * POST SINGLE MAHASISWA
 */

function postSingleMahasiswa(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  // define fromData
  let formData = {
    nim: req.body.nim,
    nama: req.body.nama,
    jurusan: req.body.jurusan,
    asal_provinsi: req.body.asal_provinsi,
  };

  // insert query
  connection.query(
    "INSERT INTO mahasiswa SET ?",
    formData,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      }

      return res.status(201).json({
        status: true,
        message: "Insert Data Successfully",
        data: rows[0],
      });
    }
  );
}

/**
 * GET SINGLE MAHASISWA
 */

function getSingleMahasiswa(req, res) {
  let id = req.params.id;

  connection.query(`SELECT * FROM mahasiswa WHERE nim = ${id}`, (err, rows) => {
    // if error
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Data Mahasiswa Not Found!",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Detail Data Mahasiswa",
      data: rows[0],
    });
  });
}

/**
 * UPDATE SINGLE MAHASISWA
 */

function updateSingleMahasiswa(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  let id = req.params.id;

  let formData = {
    nama: req.body.nama,
    jurusan: req.body.jurusan,
    asal_provinsi: req.body.asal_provinsi,
  };

  connection.query(
    `UPDATE mahasiswa SET ? WHERE nim = ${id}`,
    formData,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Update Data Successfully!",
      });
    }
  );
}

/**
 * DELETE SINGLE MAHASISWA
 */

function deleteSingleMahasiswa(req, res) {
  let id = req.params.id;

  connection.query(`DELETE FROM mahasiswa WHERE nim = ${id}`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Delete Data Successfully!",
    });
  });
}

module.exports = {
  getAllMahasiswa: getAllMahasiswa,
  postSingleMahasiswa: postSingleMahasiswa,
  getSingleMahasiswa: getSingleMahasiswa,
  updateSingleMahasiswa: updateSingleMahasiswa,
  deleteSingleMahasiswa: deleteSingleMahasiswa,
};
