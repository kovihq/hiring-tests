import { ModelWithStatus } from './ModelWithStatus.abstract'
import { DomainError } from '@spark/dynamodborm'

export class MessageModel extends ModelWithStatus {
    constructor(data) {
        super(data)
        if(!this.messageId) {
            const messageId = '1|1'
            this.set('messageId',messageId)
        }
    }
}
