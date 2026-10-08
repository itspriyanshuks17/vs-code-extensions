# Math Extension

A lightweight mathematics toolkit for Visual Studio Code. Run common calculations from the Command Palette without leaving your editor.

## Features

- Calculate arithmetic expressions.
- Add, subtract, multiply, or divide comma-separated numbers.
- Calculate powers, square roots, percentages, and averages.

## Use

1. Open the Command Palette with `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS).
2. Run a command beginning with `Math:`.
3. Enter the requested number or expression.

For example, run **Math: Add** and enter `10, 20, 30` to get `Result: 60`.

## Install From a VSIX

1. Build the package in the extension project with `npm run package`.
2. In VS Code, open **Extensions**, select the `...` menu, then choose **Install from VSIX...**.
3. Select the generated `math-extension-0.0.1.vsix` file and reload VS Code if prompted.

## Known Limitation

**Math: Calculate** currently evaluates expressions as JavaScript. Use it only with expressions you trust. A dedicated math expression parser is needed before this command is suitable for untrusted input.
