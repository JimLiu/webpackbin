import config from 'config'

function updateSandbox ({http, state, path, resolve}) {
  const currentBin = state.get('app.currentBin')
  const sortedPackages = Object.keys(currentBin.packages || {}).sort().reduce((currentSortedPackages, packageKey) => {
    currentSortedPackages[packageKey] = currentBin.packages[packageKey]

    return currentSortedPackages
  }, {})

  return http.post(config.sandboxServiceUrl, {
    files: currentBin.files,
    packages: sortedPackages,
    loaders: currentBin.loaders
  }, {
    withCredentials: true
  })
    .then(path.success)
    .catch(path.error)
}

export default updateSandbox
