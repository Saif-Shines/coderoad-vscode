import { join } from 'path'
import * as vscode from 'vscode'
import { COMMANDS } from '../../commands'

const openFiles = async (files: string[]) => {
  if (!files.length) {
    return
  }
  for (const filePath of files) {
    try {
      const workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders
      if (!workspaceFolders || !workspaceFolders.length) {
        throw new Error('No workspace directory. Open a workspace directory and try again')
      }
      const wr: string = workspaceFolders[0].uri.path
      const absoluteFilePath = join(wr, filePath)
      const doc = await vscode.workspace.openTextDocument(absoluteFilePath)
      await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
    } catch (error) {
      console.log(`Failed to open file ${filePath}: ${error.message}`)
    }
  }
}

export default openFiles
