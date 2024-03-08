const { Router } = require("express")
const coursesModel = require("../model/courses.model");

const router = Router();

// GET /api/courses/
router.get(`/`, async (req, res) => {
    try {
      let courses = await coursesModel.find();
      return res.json({
        message: `courses list`,
        courses,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: courses.routes.js ~ router.get ~ error:",
        error
      );
    }
});

// POST /api/courses/
router.post(`/`, async (req, res) => {
  try {
    const courseBody = req.body;
    let newCourse = await coursesModel.create(courseBody);

    return res.json({
      message: `new Course added`,
      course: newCourse,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: courses.routes.js ~ router.get ~ error:",
      error
    );
  }
});


module.exports = router;