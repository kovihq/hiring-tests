async function showMessage(
    ORM,
    messageId
) {
    const { Repository } = ORM
    return Repository.get({ messageId })
}
showMessage.inject = ['MessageORM']

module.exports = showMessage
