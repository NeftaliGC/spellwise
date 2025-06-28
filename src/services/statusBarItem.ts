import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function updateStatusBar(languageId: string, status: string = 'active') {
	if (!statusBarItem) {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
		statusBarItem.show();
	}

	statusBarItem.text = `Spellwise: ${languageId}`;
	statusBarItem.tooltip = `Spellwise ${status} para el lenguaje ${languageId}`;

    // Si el lenguaje no es soportado, mostrarlo como inactivo
    if (status === 'inactive') {
        statusBarItem.color = 'orange';
    } else {
        statusBarItem.color = '';
    }
}
