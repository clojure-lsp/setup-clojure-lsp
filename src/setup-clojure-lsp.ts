import * as core from '@actions/core'
import * as installer from './installer'

async function run(): Promise<void> {
  try {
    const version = core.getInput('clojure-lsp-version', {required: true})

    await installer.getClojureLsp(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
