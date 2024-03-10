const { Router } = require("express");

const studentsData = require("../data/students");
const studentsModel = require("../models/students.model");

const router = Router();

router.get("/insertion", async (req, res) => {
  const students = await studentsModel.insertMany(studentsData);
  return res.json({
    message: `data inserted succesfully`,
    students,
  });
});

router.get(`/`, async (req, res) => {
  // /api/students?page=2&limit=5
  const { page = 1, limit = 5 } = req.query;
  // si no viene por defecto tienen esos valores

  const {
    docs,
    totalDocs,
    limit: limitPag,
    totalPages,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  } = await studentsModel.paginate({}, { page, limit });

  //filterQuery es exactamente a como funciona el find
  //options, de la paginacion


  const studentAverage = await studentsModel.aggregate([
    { $group: { _id: "estudiantes", promedio: { $avg: "$grade" } } },
  ]);

  return res.json({
    message: `get all Students`,
    students: docs,
    studentAverage: studentAverage[0].promedio,
    length: totalDocs,
    limit: limitPag,
    page,
    totalPages,
    hasNextPage,
    nextPage,
    hasPrevPage,
    prevPage,
  });
});

module.exports = router;