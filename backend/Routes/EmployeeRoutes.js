


const router = require('express').Router();
const multer = require('multer');
const ensureAuthenticated = require('../Middlewares/Auth');
const { isAdmin } = require('../Middlewares/adminMiddleware');
const { createEmployee, updateEmployeeById, getAllEmployee, getEmployeeById, deleteEmployeeById } = require('../Controllers/EmployeeController');

// Multer setup
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });

router.get('/', getAllEmployee);
router.get('/:id', getEmployeeById);
router.post('/', ensureAuthenticated, isAdmin, upload.single('profileImage'), createEmployee);
router.put('/:id', ensureAuthenticated, isAdmin, upload.single('profileImage'), updateEmployeeById);
router.delete('/:id', ensureAuthenticated, isAdmin, deleteEmployeeById);

module.exports = router;
