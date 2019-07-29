import { Model } from '@spark/dynamodborm'

export class ModelWithStatus extends Model {
    changeStatus(status, others) {
        this.status = status
        const historyPayload = {
            status,
            ...others,
            createdAt: new Date().toISOString()
        }
        if (!!this.statusHistory && this.statusHistory.length) {
            this.statusHistory.push(historyPayload)
        } else {
            this.statusHistory = [ historyPayload ]
        }
    }
}
