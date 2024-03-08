const { Router } = require("express")
const studentsModel = require("../model/students.model");

const router = Router();

// GET /api/students/
router.get(`/`, async (req, res) => {
    try {
      let students = await studentsModel.find();
      //let students = await studentsModel.find().populate("courses.course");
      //let students = await studentsModel.find().populate("courses.course", {title: 1});
      
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


// POST /api/students/inscription
router.post(`/inscription`, async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    let student = await studentsModel.findOne({ _id: studentId });
    console.log("🚀 ~ router.post ~ student:", student)

    student.courses.push({ course: courseId });
    let resultUpd = await studentsModel.updateOne({ _id: studentId }, student);
    // To do: manejo de errores con el resultUpd
    
    return res.json({
      message: `this student ${student.firstName} have a new Course`,
    });


    
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js ~ router.get ~ error:",
      error
    );
  }
});


module.exports = router;