const { Router } = require("express")
const studentsModel = require("../model/students.model");
const studentInsertData = require("../data/students");

const router = Router();

// Ruta de insertion
// GET /api/students/insertion
router.get(`/insertion`, async (req, res) => {
  try {
    let result = await studentsModel.insertMany(studentInsertData);
    return res.json({
      message: "all the students are inserted succesfully",
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
        message: `students list`,
        students,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: students.routes.js ~ router.get ~ error:",
        error
      );
    }
});


// POST /api/students
router.post(`/`, async (req, res) => {
  try {
    const studentBody = req.body;
    let newStudent = await studentsModel.create(studentBody);

    return res.json({
      message: `new Student added`,
      student: newStudent,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js ~ router.get ~ error:",
      error
    );
  }
});


// GET
router.get(`/groups`, async (req, res) => {
  try {
    //Obtener a los estudiantes agrupados por calificación del mejor al peor
    const studentsByGrade = await studentsModel.aggregate([
      {
        //agrupa por cada nota poniendo cada estudiante que tiene esa nota
        $group: { _id: "$grade", students: { $push: "$$ROOT" } },
      },
      {
        //ordenar de mayor a menor
        $sort: { _id: -1 },
      },
      {
        //proyeccion sobre el campo students
        $project: {
          _id: 1, //se muestra la nota
          students: { //indico las cosas que quiero mostrar
            first_name: 1,
            group: 1,
          },
        },
      },
    ]);

    //Obtener a los estudiantes agrupados por grupo
    const studentsByGroup = await studentsModel.aggregate([
      {
        //agrupa por cada grupo
        $group: { _id: "$group", studentsGroups: { $push: "$$ROOT" } },
      }
    ]);
    
    return res.json({
      ok: true,
      studentsByGrade,
      studentsByGroup
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js ~ router.get ~ error:",
      error
    );
  }
});


router.get(`/average`, async (req, res) => {
  try {
    //Obtener el promedio de los estudiantes
    //PROMEDIO ESTUDIANTES 1B
    const studentAverage1B = await studentsModel.aggregate([
      {
        $match: { group: "1B" },
      },
      {
        $group: { _id: "1B", 
        promedio: { $avg: "$grade" },
        notaMinima: { $min: "$grade" },
        notaMaxima: { $max: "$grade" }
      },
      }
    ]);

    //PROMEDIO ESTUDIANTES 1A
    const studentAverage1A = await studentsModel.aggregate([
      {
        $match: { group: "1A" },
      },
      {
        $group: { 
          _id: "1A", 
          promedio: { $avg: "$grade" }
        },
      }
    ]);
    
    return res.json({
      ok: true,
      studentAverage1B,
      studentAverage1A
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js ~ router.get ~ error:",
      error
    );
  }
});


router.get(`/average/v2`, async (req, res) => {
  try {
    //PROMEDIO GENERAL DE ESTUDIANTES.
    const generalAverage = await studentsModel.aggregate([
      {
        $group: {
          _id: "students",
          promedio: { $avg: "$grade" },
        },
      },
    ]);

    const maleStudentAverage  = await studentsModel.aggregate([
      {
        $match: { gender: "Male" },
      },
      {
        $group: {
          _id: "male students",
          promedio: { $avg: "$grade" },
        },
      },
    ]);

    const femaleStudentAverage  = await studentsModel.aggregate([
      {
        $match: { gender: "Female" },
      },
      {
        $group: {
          _id: "female students",
          promedio: { $avg: "$grade" },
        },
      },
    ]);
    
    return res.json({
      ok: true,
      generalAverage,
      maleStudentAverage,
      femaleStudentAverage
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js ~ router.get ~ error:",
      error
    );
  }
});








module.exports = router;