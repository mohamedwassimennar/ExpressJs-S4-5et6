const {DateSchema} = require("yup");
const validateMW = (DateSchema) => async (req,res,next)=>{
    const data = req.body;
    try{
        await DateSchema.validate(data);
        next(); //passer les données pour le router
    } catch(e){
        console.log(e)
        res.status(400).json({ error: e.errors.join(", ")});
    }
};

module.exports = validateMW;