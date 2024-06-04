const { Feedback } = require("../models/models");

class FeedbackController {
    async submit(req, res) {
        const { email, name, message } = req.body;
        try {
            const feedback = await Feedback.create({ email, name, message });
            res.status(200).send('Feedback submitted');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error submitting feedback');
        }
    }

    async getAll(req, res) {
        try {
            const feedback = await Feedback.findAll();
            res.json(feedback);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error getting feedback');
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        await Feedback.destroy({ where: { id: id } });
        return res.json({ message: 'Feedback deleted successfully' });
    }   
}

module.exports = new FeedbackController();
