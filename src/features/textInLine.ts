import * as vscode from 'vscode';

function getTextInLine(): [string, string] | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No hay editor activo
    }

    const position = editor.selection.active;
    const line = editor.document.lineAt(position.line);
    
    // Retorna el texto de la línea actual
    return [line.text, `${position.line}:${position.character}`];
}

export function getCommentInLine(syntax: { lineComment?: string}): string | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No hay editor activo
    }

    const [lineText, position] = getTextInLine() || [];
    if (!lineText) {
        return null; // No hay texto en la línea actual
    }

    if (syntax.lineComment && lineText.includes(syntax.lineComment)) {
        const commentStartIndex = lineText.indexOf(syntax.lineComment);
        const commentText = lineText.substring(commentStartIndex + syntax.lineComment.length).trim();
        return commentText; // Retorna el texto del comentario
    }

    return null; // No se encontró ningún comentario
}
