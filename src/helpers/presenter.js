function presenter(Presenter) {
  console.log(Presenter)
  const p = new Presenter({})
  p.register('links', {
    'self':({data: { messageId}}) => ({
      method: 'GET',
      href: `/${messageId}`
    })
  })
  return p
}
presenter.inject =['Presenter']
presenter.autoCall = true
module.exports = presenter
