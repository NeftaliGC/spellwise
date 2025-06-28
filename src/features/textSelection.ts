import * as vscode from 'vscode';

export function getSelectedText(): String | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.selection.isEmpty) {
        return null; // No hay texto seleccionado
    }
    
    return editor.document.getText(editor.selection);
}

export function isTextSelected(): boolean {
    const editor = vscode.window.activeTextEditor;
    return editor ? !editor.selection.isEmpty : false;
}
