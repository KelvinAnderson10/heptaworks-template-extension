const fs = require('fs');
const path = require('path')
const { exec, execSync } = require('node:child_process');

class Utils {
    createPack = (currentPath, githubUrl) => {
		try {
			execSync('git init', {cwd: currentPath}).toString()
			execSync(`git remote add origin ${githubUrl}`, {cwd: currentPath}).toString()
			execSync('git pull origin main', {cwd: currentPath}).toString()
			execSync('git remote remove origin', {cwd: currentPath}).toString()
		} catch (error) {
			throw 1
		}
    }
}

module.exports = {
    Utils
}