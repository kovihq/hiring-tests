const controller = function () {
    /**
     * Get lists, filtering by name (exactly) and/or by people (least one people)
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Response}
     * @throws {Error} error according message
     */
    const getEqualElements = async (req, res) => {
        res.status(204);
        return res.send();
    }
    return { getEqualElements };
}

module.exports = controller();