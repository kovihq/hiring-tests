import { ModelWithStatus } from './ModelWithStatus.abstract'
import { DomainError } from '@spark/dynamodborm'

export class MessageModel extends ModelWithStatus {
    constructor(data) {
        super(data)
        if(!this.messageId && this.input) {
            const [left = [], rigth = []] = this.input
            const array2string = arr => arr.join('-')
            const messageId = `${array2string(left)}|${array2string(rigth)}`
            this.set('messageId',messageId)
        }
    }

    async save() {
        await this.validate()
        return this._save()
    }
}
