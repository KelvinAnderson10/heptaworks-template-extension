const vscode = require('vscode');
const fs = require('fs');
const path = require('path')
const { exec, execSync } = require('node:child_process');

class Utils {
    createPack = (currentPath, githubUrl, packName) => {
		vscode.window.withProgress({
			cancellable: false,
			location: vscode.ProgressLocation.Notification,
			title: `Generating: ${packName} Pack...`
		}, async() => {
			try {
				execSync('git init', {cwd: currentPath}).toString()
				execSync(`git remote add origin ${githubUrl}`, {cwd: currentPath}).toString()
				execSync('git pull origin main', {cwd: currentPath}).toString()
				vscode.window.showInformationMessage(`${packName} Pack generated! Have fun!`);
			} catch (error) {
				// vscode.window.showErrorMessage(error.message)
				vscode.window.showErrorMessage("failed to generate pack, please try again.")
			}
			execSync('git remote remove origin', {cwd: currentPath}).toString()
		})
    }
}

module.exports = {
    Utils
}