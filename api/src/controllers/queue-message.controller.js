const { requestGetEqualsValidator } = require('../validators/requestGetEquals.validator');
const { GetEqualElements } = require('../services/queue-message.service');

const controller = function () {
    /**
     * Get equal elements inside two queues arrays of int
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Response}
     * @throws {Error} error according message
     */
    const getEqualElementsOnArrays = async (req, res) => {
        try {
            const { array1, array2 } = req.body;

            await requestGetEqualsValidator({ array1, array2 });

            const equalElements = await GetEqualElements(array1, array2);

            if (equalElements.length <= 0) {
                res.status(204);
                return res.send();
            } else {
                res.status(200);
                return res.send(equalElements);
            }
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
    return { getEqualElementsOnArrays };
}

module.exports = controller();