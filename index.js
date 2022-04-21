require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const {connectToDatabase} = require('./config/DatabaseConection');

// Import Routers
const UserRouter = require('./routers/user.router');
const UniversityRouter = require('./routers/university.router');
const CollageRouter = require('./routers/collage.router');
const EducationRouter = require('./routers/education.router');
const CountryRouter = require('./routers/country.router');
const DepartmentRouter = require('./routers/department.router');
const NationaltyRouter = require('./routers/nationalty');
const SubjectRouter = require('./routers/subject.router');
const ExamRouter = require('./routers/exam.router');
const MarkRouter = require('./routers/mark.router');
const PlaceRouter = require('./routers/place.router');

const app = express();

// Connect to database
connectToDatabase();

// Set json settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Use Routers
app.use('/users', UserRouter);
app.use('/countries', CountryRouter);
app.use('/universities', UniversityRouter);
app.use('/collages', CollageRouter);
app.use('/educations', EducationRouter);
app.use('/departments', DepartmentRouter);
app.use('/nationalties', NationaltyRouter);
app.use('/subjects', SubjectRouter);
app.use('/exams', ExamRouter);
app.use('/marks', MarkRouter);
app.use('/places', PlaceRouter);

// Test route
const upload = multer();
app.post('/test', upload.single('image'), (req, res) => {
  res.status(200).json(req.file);
})

const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`App is listening on http://localhost:${port}`);
})