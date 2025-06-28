import * as vscode from 'vscode';

export function getCodeIdentifier(): string {
    const codeLanguage = vscode.window.activeTextEditor?.document.languageId;
    if (!codeLanguage) {
        return 'unknown';
    }
    
    return codeLanguage.toLowerCase();
}