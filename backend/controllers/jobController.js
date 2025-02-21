const fetch = require('node-fetch');
const env = require('../config/Environment');

// Render Job Page
module.exports.jobPage = async function (req, res) {
    try {
        // Fetch job data from the API
        const response = await fetch(env.api_path);

        // Check if the response is successful
        if (!response.ok) {
            console.error(`Error fetching jobs: ${response.statusText}`);
            req.flash('error', 'Failed to fetch job data. Please try again later.');
            return res.redirect('back');
        }

        // Parse the response data
        const jobsData = await response.json();

        // Render the jobs page with data
        return res.render('placementCell', {
            title: "Placement Cell",
            body: jobsData.jobs
        });
    } catch (error) {
        console.error("Error fetching job data:", error);
        req.flash('error', 'An error occurred while fetching job data.');
        return res.redirect('back');
    }
};
