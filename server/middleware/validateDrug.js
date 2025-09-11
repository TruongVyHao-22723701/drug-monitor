// middleware/validateDrug.js
module.exports = function validateDrug(req, res, next) {
    const { name, dosage, card, pack, perDay } = req.body;

    // a. Name length > 5
    if (!name || name.length <= 5) {
        return res.status(400).json({ message: "Name must be longer than 5 characters" });
    }

    // b. Dosage format: XX-morning,XX-afternoon,XX-night (X is digit)
    const dosageRegex = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
    if (!dosage || !dosageRegex.test(dosage)) {
        return res.status(400).json({ message: "Dosage must follow format: XX-morning,XX-afternoon,XX-night" });
    }

    // c. Card > 1000
    if (!card || Number(card) <= 1000) {
        return res.status(400).json({ message: "Card must be greater than 1000" });
    }

    // d. Pack > 0
    if (!pack || Number(pack) <= 0) {
        return res.status(400).json({ message: "Pack must be greater than 0" });
    }

    // e. PerDay > 0 and < 90
    if (!perDay || Number(perDay) <= 0 || Number(perDay) >= 90) {
        return res.status(400).json({ message: "PerDay must be greater than 0 and less than 90" });
    }

    // Nếu tất cả hợp lệ, tiếp tục tới controller
    next();
};