const { Router } = require("express")
const studentsData = require("../data/students");
const studentsModel = require("../model/students.model");

const router = Router();

// Ruta de insertion
// GET /api/students/insertion
router.get(`/insertion`, async (req, res) => {
    try {
      let result = await studentsModel.insertMany(studentsData);
      return res.json({
        message: "massive insert successfully",
        students: result,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: students.routes.js ~ router.get ~ error:",
        error
      );
    }
  });

// GET /api/students/
router.get(`/`, async (req, res) => {
    try {
      let students = await studentsModel.find();
      return res.json({
        message: `student list`,
        students,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: students.routes.js ~ router.get ~ error:",
        error
      );
    }
  });

// GET /api/students/queries
router.get(`/queries/age`, async (req, res) => {
    try {
      let studentsOlderAge = await studentsModel.find({
        edad: { $gte: 30 },
      });
      return res.json({
        message: `student list`,
        studentsOlderAge
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: students.routes.js ~ router.get ~ error:",
        error
      );
    }
  });

router.get(`/queries/v1`, async (req, res) => {
    try {
      let studentsOlderAge = await studentsModel.find({
        edad: { $gte: 30 },
      });
  
      let studentsApprovedOrYounger = await studentsModel.find({
        $or: [{ nota: { $gte: 7 } }, { age: { $lt: 25 } }],
      });
  
      let studentsBackend = await studentsModel.find({
        curso: /^Backend$/i,
        //Esto es una expresion regular
        //Hace un match exacto
      });
  
      let studentsEndReg = await studentsModel.find({
        curso: { $regex: /end/i },
        //regex (regular expresion)
        //aca busca que contenga la expresion
        //i de insensitive (puede ser mayuscula o minuscula)
      });
      return res.json({
        message: `student list`,
        studentsOlderAge,
        studentsOlderAgeCount: studentsOlderAge.length,
        studentsApprovedOrYounger,
        studentsBackend,
        studentsEndReg,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: students.routes.js:63 ~ router.get ~ error:",
        error
      );
    }
  });
  

router.get(`/queries/v2`, async (req, res) => {
    try {
      let studentsNoteWithProjection = await studentsModel.find(
        {
          nota: { $gte: 8 },
        },
        {
          nombre: 1,
          apellido: 1,
          curso: 1,
          nota: 1,
        }
      );
  
      let studentsNoteWithProjectionSorted = await studentsModel
        .find(
          {
            nota: { $gte: 6 },
          },
          {
            nombre: 1,
            apellido: 1,
            curso: 1,
            nota: 1,
          }
        )
        .sort({ nota: -1, edad: -1 });
  
      return res.json({
        message: `student list`,
        studentsNoteWithProjection,
        studentsNoteWithProjectionSorted,
      });
    } catch (error) {}
  });
  

router.get(`/queries/v3`, async (req, res) => {
    try {
      let studentsSortedByAgeOlderToYounger = await studentsModel.find({}).sort({ edad: -1 });
      //con -1 ordena de mayor a menor

      let studentsSortedByAgeYoungerToOlder = await studentsModel.find({}).sort({ edad: 1 });
  
      let youngerStudent = await studentsModel
        .find({})
        .sort({ edad: 1 })
        .limit(1);
        //ordena de menor a mayor y agarra el primer elemento
  
      return res.json({
        message: `student list`,
        studentsSortedByAgeOlderToYounger,
        studentsSortedByAgeYoungerToOlder,
        youngerStudent,
        // youngerStudent2,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: students.routes.js ~ router.get ~ error:",
        error
      );
    }
  });

module.exports = router;