const express = require("express");
const router = express.Router();
const Student =  require("../models/student");
const validateMW =require("../middlewares/validateMW");
const studentSchema = require("../validators/studentsSchema"); 

router.get("/",async(req,res,next)=>{
    const students = await Student.find();
    res.json(students);
});

router.post('/add', validateMW(studentSchema), async (req,res,next)=>{
    const student= new Student({
    FullName:   req.body.studentName,
    Grade:  req.body.studentGrade,
});
await student.save();
res.json({message:"Student added"});
});

//n7awel f update 
router.put("/edit/:id", validateMW(studentSchema), async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }

        student.FullName = req.body.studentName;
        student.Grade = req.body.studentGrade;
        
        await student.save();

        return res.status(200).json({ message: "Étudiant mis à jour avec succès", updatedStudent: student });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étudiant :", error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de l'étudiant" });
    }
});

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }
        return res.json({ message: "Étudiant supprimé" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'étudiant :", error);
        return res.status(500).json({ message: "Erreur lors de la suppression de l'étudiant" });
    }
});

router.get("/findByName/:name", async (req, res, next) => {
    try {
        const students = await Student.find({ FullName: req.params.name });

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "Aucun étudiant trouvé avec ce nom" });
        }

        return res.status(200).json({ students });
    } catch (error) {
        console.error("Erreur lors de la recherche d'étudiants par nom :", error);
        return res.status(500).json({ message: "Erreur lors de la recherche d'étudiants par nom" });
    }
});



module.exports=router;