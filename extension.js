const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const {Utils} = require('./utils');
const { GIT_URL } = require('./constant');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const currentPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
	const util = new Utils();

	// Go Starter Pack
	let goStarterPack = vscode.commands.registerCommand('hepta-works.gostarter', function () {
		try {
			vscode.window.showInformationMessage('Generating: Go Starter Pack...');
			util.createPack(currentPath, GIT_URL.GO_STARTER_PACK)
			vscode.window.showInformationMessage('Go Starter Pack Generated ! Have Fun !');
		} catch (error) {
			vscode.window.showErrorMessage(error.message)
		}
	});

	// Go Professional Pack
	let goProfessionalPack = vscode.commands.registerCommand('hepta-works.goprofessional', function () {
		try {
			vscode.window.showInformationMessage('Generating: Go Professional Pack...');
			util.createPack(currentPath, GIT_URL.GO_PROFESSIONAL_PACK)
			vscode.window.showInformationMessage('Go Professional Pack Generated ! Have Fun !');
		} catch (error) {
			vscode.window.showErrorMessage(error.message)
		}
	});

	// React Baby Pack
	let reactBabyPack = vscode.commands.registerCommand('hepta-works.reactbaby', function () {
		try {
			vscode.window.showInformationMessage('Generating: React Baby Pack...');
			util.createPack(currentPath, GIT_URL.REACT_BABY_PACK)
			vscode.window.showInformationMessage('React Baby Pack Generated ! Have Fun !');
		} catch (error) {
			vscode.window.showErrorMessage(error.message)
		}
	});

	// React Designer Pack
	let reactDesignerPack = vscode.commands.registerCommand('hepta-works.reactdesigner', function () {
		try {
			vscode.window.showInformationMessage('Generating: React Designer Pack...');
			util.createPack(currentPath, GIT_URL.REACT_DESIGNER_PACK)
			vscode.window.showInformationMessage('React Designer Pack Generated ! Have Fun !');
		} catch (error) {
			vscode.window.showErrorMessage(error.message)
		}
	});

	// React Monster Pack
	let reactMonsterPack = vscode.commands.registerCommand('hepta-works.reactmonster', function () {
		try {
			vscode.window.showInformationMessage('Generating: React Monster Pack...');
			util.createPack(currentPath, GIT_URL.REACT_MONSTER_PACK)
			vscode.window.showInformationMessage('React Monster Pack Generated ! Have Fun !');
		} catch (error) {
			vscode.window.showErrorMessage(error.message)
		}
	});

	context.subscriptions.push(goStarterPack);
	context.subscriptions.push(goProfessionalPack);
	context.subscriptions.push(reactBabyPack);
	context.subscriptions.push(reactDesignerPack);
	context.subscriptions.push(reactMonsterPack);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
