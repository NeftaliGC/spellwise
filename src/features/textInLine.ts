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

export function getStringInLine(syntax: { stringDelimiters?: string[] }): string | null {
    const [lineText, position] = getTextInLine() || [];
    if (!lineText) {
        return null; // No hay texto en la línea actual
    }

    if (syntax.stringDelimiters && syntax.stringDelimiters.length > 0) {
        const delimiters = syntax.stringDelimiters;
        const regex = new RegExp(`(${delimiters.join('|')})(.*?)(\\1)`, 'g');
        const match = regex.exec(lineText);
        return match ? match[2] : null; // Retorna el texto entre los delimitadores
    }

    return null; // No hay delimitadores de cadena definidos
}
