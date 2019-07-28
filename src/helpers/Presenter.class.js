class Presenter {
    constructor(customErrorsHandlers = {}) {
      this.links = {}
      this.parse = JSON.stringify
      this.errorsHandlers = {
        'ConnectionError': () => ({
          code: 'db_connection_error',
          status: 503,
          message: 'Something went wrong with the connection of database, please try again latter...'
        }),
        'NotFoundItem': () => ({
          code: 'not_found_item',
          status: 404,
          message: 'Please review the informations, the item searched was not found...'
        }),
        'ValidationError': (err) => ({
          code: 'invalid_payload',
          status: 422,
          errors: err.errors.map(({ identifier, message }) => ({ identifier, message }))
        }),
        ...customErrorsHandlers,
      }
    }
  
    register(key, props, tag = '/') {
      console.log(key, props, tag)
      if (props instanceof Function) {
        console.log('!!!')
        this[key] = props
      } else {
        Object.assign(this[key], { [tag]: props })
      }
    }
  
    succeeded(data, tag = '/') {
      const obj = this.links[tag]
      return typeof data !== 'string' ? this.dealWithObject(data, tag, obj) : data
    }
  
    dealWithObject(data, tag, obj) {
  
      const result =
        !!obj && Object.keys(obj).length ?
          data instanceof Array ?
            data.reduce((list, item) => [...list, this.injectHypermediaLink(item, tag)], []) :
            this.injectHypermediaLink(data, tag) :
          data
  
      return this.parse(result)
    }
  
    injectHypermediaLink(data, tag = '/') {
      const obj = this.links[tag]
      return Object.keys(obj).reduce((d, link) => {
        if (link === 'self') {
          console.log('@self', JSON.stringify(d))
          console.log('...@self', JSON.stringify({
            ...d, _links: obj[link](d),
          }))
          return {
            ...d, _links: obj[link](d),
          }
        }
        if (!!d[link]) {
          if (d[link] instanceof Array) {
            return { ...d, [link]: d[link].map((item) => ({ ...item, _links: obj[link](d, item) })) }
          } else {
            return {
              ...d, [link]: { ...d[link], _links: obj[link](d[link]) },
            }
          }
        }
        return d
      }, data)
    }
  
    failed(errors) {
      if (errors.name === 'APIError') {
        return this.parse({
          code: errors.code,
          status: errors.status,
          ...(typeof errors.message !== 'undefined' ? { message: errors.message } : {}),
          ...(typeof errors.errors !== 'undefined' ? { errors: errors.errors } : {})
        })
      }
      if (errors.name === 'DomainError' || errors.name === 'DynamoDBORMError' || errors.name === 'ParserError') {
        if (this.errorsHandlers.hasOwnProperty(errors.code)) {
          return this.parse(this.errorsHandlers[errors.code](errors))
        }
        return this.parse({
          code: errors.code,
          status: 422,
          ...(
            errors.errors && errors.errors.length ?
              {
                errors: errors.errors.map(({ identifier, message }) => ({ identifier, message }))
              }
              : {}
          ),
        })
      }
      console.log(JSON.stringify(errors))
      return this.parse({
        code: 'internal_server_error',
        status: 503,
        message: 'Something went wrong, please try again latter...'
      })
    }
  }

module.exports = Presenter
