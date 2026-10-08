// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "math-extension" is now active!');

	// Addition command - adds multiple numbers together
	const addCommand = vscode.commands.registerCommand(
		'math-extension.add',
		async function () {
			const numbers = await getNumbers();
			if (!numbers) {
				return;
			}

			const result = numbers.reduce((a, b) => a + b, 0);

			showResult(result);
		}
	);

	// Subtraction command - subtracts numbers sequentially
	const subtractCommand = vscode.commands.registerCommand(
		'math-extension.subtract',
		async function () {
			const numbers = await getNumbers();
			if (!numbers) {
				return;
			}

			let result = numbers[0];
			for (let i = 1; i < numbers.length; i++) {
				result -= numbers[i];
			}

			showResult(result);
		}
	);

	// Multiplication command - multiplies multiple numbers together
	const multiplyCommand = vscode.commands.registerCommand(
		'math-extension.multiply',
		async function () {
			const numbers = await getNumbers();
			if (!numbers) {
				return;
			}

			const result = numbers.reduce((a, b) => a * b, 1);

			showResult(result);
		}
	);

	// Division command - divides numbers sequentially with zero check
	const divideCommand = vscode.commands.registerCommand(
		'math-extension.divide',
		async function () {
			const numbers = await getNumbers();
			if (!numbers) {
				return;
			}

			let result = numbers[0];
			for (let i = 1; i < numbers.length; i++) {
				if (numbers[i] === 0) {
					vscode.window.showErrorMessage(
						'Cannot divide by zero.'
					);
					return;
				}

				result /= numbers[i];
			}

			showResult(result);
		}
	);

	// Power command - calculates base raised to exponent
	const powerCommand = vscode.commands.registerCommand(
		'math-extension.power',
		async function () {
			const base = await vscode.window.showInputBox({
				prompt: 'Enter the base number'
			});

			if (base === undefined) {
				return;
			}

			const exponent = await vscode.window.showInputBox({
				prompt: 'Enter the exponent'
			});

			if (exponent === undefined) {
				return;
			}

			const baseNumber = Number(base);
			const exponentNumber = Number(exponent);

			if (isNaN(baseNumber) || isNaN(exponentNumber)) {
				vscode.window.showErrorMessage(
					'Please enter valid numbers.'
				);
				return;
			}

			const result = Math.pow(baseNumber, exponentNumber);

			showResult(result);
		}
	);

	// Square Root command - calculates square root of a number
	const squareRootCommand = vscode.commands.registerCommand(
		'math-extension.squareRoot',
		async function () {
			const input = await vscode.window.showInputBox({
				prompt: 'Enter a number'
			});

			if (input === undefined) {
				return;
			}

			const number = Number(input);

			if (isNaN(number)) {
				vscode.window.showErrorMessage(
					'Please enter a valid number.'
				);
				return;
			}

			if (number < 0) {
				vscode.window.showErrorMessage(
					'Cannot calculate square root of a negative number.'
				);
				return;
			}

			const result = Math.sqrt(number);

			showResult(result);
		}
	);

	// Percentage command - calculates percentage of a value
	const percentageCommand = vscode.commands.registerCommand(
		'math-extension.percentage',
		async function () {
			const value = await vscode.window.showInputBox({
				prompt: 'Enter the value'
			});

			if (value === undefined) {
				return;
			}

			const percentage = await vscode.window.showInputBox({
				prompt: 'Enter percentage'
			});

			if (percentage === undefined) {
				return;
			}

			const valueNumber = Number(value);
			const percentageNumber = Number(percentage);

			if (
				isNaN(valueNumber) ||
				isNaN(percentageNumber)
			) {
				vscode.window.showErrorMessage(
					'Please enter valid numbers.'
				);
				return;
			}

			const result =
				(valueNumber * percentageNumber) / 100;

			showResult(result);
		}
	);

	// Average command - calculates average of multiple numbers
	const averageCommand = vscode.commands.registerCommand(
		'math-extension.average',
		async function () {
			const numbers = await getNumbers();

			if (!numbers) {
				return;
			}

			const sum = numbers.reduce(
				(total, number) => total + number,
				0
			);

			const result = sum / numbers.length;

			showResult(result);
		}
	);

	// General calculator command - evaluates mathematical expressions
	const calculateCommand = vscode.commands.registerCommand(
		'math-extension.calculate',
		async function () {
			const expression =
				await vscode.window.showInputBox({
					prompt: 'Enter mathematical expression',
					placeHolder: 'Example: 10 + 20 * 5'
				});

			if (expression === undefined) {
				return;
			}

			try {
				// Basic calculator for learning purposes
				const result = Function(
					`"use strict"; return (${expression})`
				)();

				if (typeof result !== 'number' ||
					!Number.isFinite(result)) {
					throw new Error();
				}

				showResult(result);

			} catch {
				vscode.window.showErrorMessage(
					'Invalid mathematical expression.'
				);
			}
		}
	);

	context.subscriptions.push(
		addCommand,
		subtractCommand,
		multiplyCommand,
		divideCommand,
		powerCommand,
		squareRootCommand,
		percentageCommand,
		averageCommand,
		calculateCommand
	);
}

// Get multiple numbers from user input separated by commas
async function getNumbers() {
	const input = await vscode.window.showInputBox({
		prompt: 'Enter numbers separated by commas',
		placeHolder: 'Example: 10, 20, 30'
	});

	if (input === undefined) {
		return null;
	}

	const values = input.split(',').map(value => value.trim());

	if (
		values.some(value => value === '' || !Number.isFinite(Number(value)))
	) {
		vscode.window.showErrorMessage(
			'Please enter valid numbers separated by commas.'
		);

		return null;
	}

	return values.map(value => Number(value));
}

// Show result in an information message
function showResult(result) {
	vscode.window.showInformationMessage(
		`Result: ${result}`
	);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
