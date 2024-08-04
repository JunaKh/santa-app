const { validateUserData } = require('../services/dataService');
const { addPendingRequest } = require('../services/emailService');

async function submitRequest(req, res) {
    const { userid, wish } = req.body;

    if (!userid || !wish) {
        return res.status(400).json({ error: "Both user ID and wish are required." });
    }

    if (wish.length > 100) {
        return res.status(400).json({ error: "Wish exceeds 100 character limit." });
    }

    const validation = await validateUserData(userid);
    if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
    }

    addPendingRequest({ userid, wish, address: validation.user.address });

    res.json({
        message: `Wish submitted successfully for ${validation.user.address}!`,
        address: validation.user.address,
    });
}

module.exports = { submitRequest };
