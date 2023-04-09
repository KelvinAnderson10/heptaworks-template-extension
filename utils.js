const vscode = require('vscode');
const fs = require('fs');
const path = require('path')
const { exec, execSync } = require('node:child_process');
const replace = require('replace-in-file');
const { TYPE } = require('./constant');

class Utils {
    createPack = async (currentPath, githubUrl, packName, type) => {
		try {
			this.isDirEmpty(currentPath)
			let projectName = await this.promptProjectName()
			this.deleteGitFolder(currentPath)
			vscode.window.withProgress({
				cancellable: false,
				location: vscode.ProgressLocation.Notification,
				title: `Generating: ${packName} Pack...`
			}, async() => {
				try {
					execSync('git init', {cwd: currentPath}).toString()
					execSync(`git remote add origin ${githubUrl}`, {cwd: currentPath}).toString()
					execSync('git pull origin main', {cwd: currentPath}).toString()
					await this.renameProject(currentPath, projectName, type)
					execSync('git add .', {cwd: currentPath}).toString()
					execSync('git commit -m "Initial commit from heptaworks"', {cwd: currentPath}).toString()
					vscode.window.showInformationMessage(`${packName} Pack generated, have fun!`);
				} catch (error) {
					vscode.window.showErrorMessage("failed to generate pack, please try again.")
				}
				execSync('git remote remove origin', {cwd: currentPath}).toString()
			})
		} catch (error) {
			vscode.window.showErrorMessage(error.message)
		}
    }

	promptProjectName = async () => {
		let projectName =  await vscode.window.showInputBox({
			prompt: "Enter a name for your new project",
			value: 'project_name',
			validateInput: text => {
			  return text.match(/^\w[a-zA-Z_0-9]*$/) ? null : 'Project name cannot contain whitespaces';  // return null if validates
		}});
		return projectName
	}

	renameProject = async (currentPath, projectName, type) => {
		var options;
		if (type == TYPE.GO){
			options = {
				files: [
					`${currentPath}/package-lock.json`,
					`${currentPath}/package.json`,
				],
				from: /testing-template/g,
				to: projectName,
			};
		}

		else if (type == TYPE.REACT) {
			options = {
				files: [
					`${currentPath}/package-lock.json`,
					`${currentPath}/package.json`,
				],
				from: /testing-template/g,
				to: projectName,
			};
		}

		try {
			await replace(options)
		}
		catch (error) {
			throw error
		}
	}

	isDirEmpty = (currentPath) => {
		if (fs.existsSync(`${currentPath}/package.json`) || fs.existsSync(`${currentPath}/package-lock.json`)) {
			throw new Error("failed to generate pack, directory must be empty")
		}
	}

	deleteGitFolder = (currentPath) => {
		if (fs.existsSync(`${currentPath}/.git`)) {
			fs.rmSync(`${currentPath}/.git`, {recursive: true})
		}
	}
}

module.exports = {
    Utils
}