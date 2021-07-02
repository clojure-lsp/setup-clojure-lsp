import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'
import * as path from 'path'
import * as os from 'os'
import {v4 as uuidv4} from 'uuid'
import {ok} from 'assert'

function _getTempDirectory(): string {
  const tempDirectory = process.env['RUNNER_TEMP'] || ''
  ok(tempDirectory, 'Expected RUNNER_TEMP to be defined')
  return tempDirectory
}

// useful for testing clojure-lsp CI snapshot builds

// the usual way to install
export async function installFromVersion(version: string): Promise<void> {
  let toolPath = tc.find('ClojureLsp', version, os.arch())

  const allClojureLspVersions = tc.findAllVersions('ClojureLsp')

  if (allClojureLspVersions.length !== 0) {
    core.info(`Versions of clojure-lsp available: ${allClojureLspVersions}`)
  } else {
    core.info(`No versions of clojure-lsp are available yet`)
  }

  if (toolPath) {
    core.info(`ClojureLsp found in cache ${toolPath}`)
  } else if (process.platform !== 'win32') {
    // Linux, osx
    // rely on clojure-lsp's installer
    const tmpPath = path.join(_getTempDirectory(), uuidv4())
    await io.mkdirP(tmpPath)

    core.info(`temporary directory ${tmpPath}`)

    const installerFile = await tc.downloadTool(
      'https://raw.githubusercontent.com/clojure-lsp/clojure-lsp/master/install'
    )
    core.info(`Downloaded installer file ${installerFile}`)

    await exec.exec('bash', [
      installerFile,
      '--dir',
      tmpPath,
      '--version',
      version
    ])

    core.info(`clojure-lsp installed to ${tmpPath}`)

    toolPath = await tc.cacheDir(tmpPath, 'ClojureLsp', version, os.arch())
  } else {
    core.info(`Windows detected, setting up clojure-lsp.exe`)

    await exec.exec('powershell', [
      '-command',
      `if (Test-Path('clojure-lsp.exe')) { return } else { (New-Object Net.WebClient).DownloadFile('https://github.com/clojure-lsp/clojure-lsp/releases/download/${version}/clojure-lsp-native-windows-amd64.zip', 'clojure-lsp.zip') }`
    ])
    await exec.exec('powershell', [
      '-command',
      "if (Test-Path('clojure-lsp.exe')) { return } else { Expand-Archive clojure-lsp.zip . }"
    ])

    toolPath = await tc.cacheFile(
      'clojure-lsp.exe',
      'clojure-lsp.exe',
      'ClojureLsp',
      version,
      os.arch()
    )
  }

  core.info(`clojure-lsp setup at ${toolPath}`)

  core.addPath(toolPath)
}

export async function getClojureLsp(version: string): Promise<void> {
  return installFromVersion(version)
}
