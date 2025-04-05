const Subject = require('../models/Subjects.model');

async function handleNewSubject(req, res) {
    const { name, startDate, endDate, totalClasses, missedClasses, attendedClasses, targetPercentage } = req.body;

    if (!name || !startDate || !endDate || totalClasses === undefined || missedClasses === undefined || attendedClasses === undefined || targetPercentage === undefined) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const subject = new Subject({
            userId: req.user,
            name,
            startDate,
            endDate,
            totalClasses,
            missedClasses,
            attendedClasses,
            targetPercentage,
        });
        await subject.save();
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleAllSubjects(req, res) {
    try {
        const subjects = await Subject.find({ userId: req.user });
        res.json(subjects);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

async function handleUpdateSubject(req, res) {
    const { attendedClasses, missedClasses } = req.body;

    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject || subject.userId.toString() !== req.user) {
            return res.status(404).json({ msg: 'Subject not found' });
        }
        subject.attendedClasses = attendedClasses;
        subject.missedClasses = missedClasses;
        await subject.save();
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports ={
    handleAllSubjects,
    handleNewSubject,
    handleUpdateSubject
}