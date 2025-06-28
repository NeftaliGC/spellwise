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

function getCommentInLine(syntax: { lineComment?: string}): [string, string] | null {
    const [lineText, position] = getTextInLine() || [];
    if (!lineText) {
        return null; // No hay texto en la línea actual
    }

    if (syntax.lineComment && lineText.includes(syntax.lineComment)) {
        const commentStartIndex = lineText.indexOf(syntax.lineComment);
        const commentText = lineText.substring(commentStartIndex + syntax.lineComment.length).trim();
        return [commentText, position ? position : '']; // Retorna el texto del comentario y la posición
    }

    return null; // No se encontró ningún comentario
}

function getStringInLine(syntax: { stringDelimiters?: string[] }): [string, string] | null {
    const [lineText, position] = getTextInLine() || [];
    if (!lineText) {
        return null; // No hay texto en la línea actual
    }

    if (syntax.stringDelimiters && syntax.stringDelimiters.length > 0) {
        const delimiters = syntax.stringDelimiters;
        const regex = new RegExp(`(${delimiters.join('|')})(.*?)(\\1)`, 'g');
        const match = regex.exec(lineText);
        
        if (match) {
            const stringText = match[2].trim();
            return [stringText, position ? position : '']; // Retorna el texto de la cadena y la posición
        }
    }

    return null; // No hay delimitadores de cadena definidos
}

export function getTextInLineWithPosition(syntax: { stringDelimiters?: string[], lineComment?: string }): [string, string] | null {

    const comment = getCommentInLine(syntax);
    const string = getStringInLine(syntax);

    //Si hay un comentario y una cadena, prioriza la cadena
    return string || comment || null;

}