const Interview = require('../models/InterviewSchema');
const Student = require('../models/StudentSchema');
const Result = require('../models/ResultSchema');

// Render Result Page
module.exports.resultPage = async function (req, res) {
    try {
        const interviewId = req.params.id;

        // Fetch interview details and populate associated students
        const companyResult = await Interview.findById(interviewId).populate('students');
        if (!companyResult) {
            req.flash('error', 'Interview not found!');
            return res.redirect('back');
        }

        return res.render('result', {
            title: "Result",
            companyResult: companyResult
        });
    } catch (error) {
        console.error("Error fetching result page:", error);
        req.flash('error', 'Error fetching result page!');
        return res.redirect('back');
    }
};

// Update Result
module.exports.update = async function (req, res) {
    try {
        const { studentId, interviewId, result } = req.body;

        // Create or update result entry
        let updateResult = await Result.findOne({ studentId, interviewId });
        if (!updateResult) {
            updateResult = new Result(req.body);
        } else {
            updateResult.result = result;
        }
        await updateResult.save();

        // Update interview's result array if the student isn't already included
        const interview = await Interview.findById(interviewId);
        if (!interview) {
            req.flash('error', 'Interview not found!');
            return res.redirect('back');
        }

        if (!interview.result.includes(studentId)) {
            interview.result.push(studentId);
            await interview.save();
        }

        // Update student's placement status if they passed
        if (result === "PASS") {
            const student = await Student.findById(studentId);
            if (student) {
                student.status = "placed";
                await student.save();
            } else {
                req.flash('error', 'Student not found!');
                return res.redirect('back');
            }
        }

        req.flash('success', 'Result updated successfully!');
        return res.redirect('back');
    } catch (error) {
        console.error("Error updating result:", error);
        req.flash('error', 'Error updating result!');
        return res.redirect('back');
    }
};
