import * as core from '@actions/core'
import * as installer from './installer'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

async function run(): Promise<void> {
  try {
    const version = core.getInput('clojure-lsp-version', { required: true })

    await installer.getClojureLsp(version)
  } catch (error) {
    core.setFailed(getErrorMessage(error))
  }
}

run()
