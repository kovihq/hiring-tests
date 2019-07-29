async function saveMessageInput(
    ORM,
    input
) {
    const { MessageORM, Repository } = ORM
    const message = new MessageORM({input})
    try {
        const alreadySavedMessage = await Repository.get({messageId: message.messageId})
        return ['already_saved', alreadySavedMessage.get()]
    } catch (err) {
        if(err.code === `NotFoundItem`) {
            message.changeStatus('sending_to_db')
            await message.save()
            return ['saved', message.get()]
        }
        throw err
    }
}
saveMessageInput.inject = ['MessageORM']

module.exports = saveMessageInput
