const { requestGetEqualsValidator } = require('../validators/requestGetEquals.validator');

const controller = function () {
    /**
     * Get lists, filtering by name (exactly) and/or by people (least one people)
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Response}
     * @throws {Error} error according message
     */
    const getEqualElements = async (req, res) => {
        try {
            const { array1, array2 } = req.body;

            await requestGetEqualsValidator({ array1, array2 });

            res.status(204);
            return res.send();
        } catch (err) {
            switch (err.message) {
                case "required-array1":
                    res.status(422);
                    return res.send("param 'array1' is required");
                case "required-array2":
                    res.status(422);
                    return res.send("param 'array2' is required");
                case "type-array1":
                    res.status(422);
                    return res.send("param 'array1' must be an array of int values");
                case "type-array2":
                    res.status(422);
                    return res.send("param 'array2' must be an array of int values");
            }
        }
    }
    return { getEqualElements };
}

module.exports = controller();