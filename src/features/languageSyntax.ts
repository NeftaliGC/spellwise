import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { getCodeIdentifier } from './codeIdentifier';
import { updateStatusBar } from '../core/statusBarItem';
import { getSelectedText, isTextSelected } from './textSelection'; 
import { getCommentInLine } from './textInLine';

interface languageSyntax {
	lineComment?: string;
	blockComment?: [string, string];
	stringDelimiters?: string[];
}

type SyntaxMap = Record<string, languageSyntax>;

let languageConfig: SyntaxMap = {};

function loadSintaxConfig(context: vscode.ExtensionContext): SyntaxMap {
	const configPath = path.join(context.extensionPath, 'src', 'config', 'languageSyntax.json');
	const rawData = fs.readFileSync(configPath, 'utf8');
	const builtInConfig: SyntaxMap = JSON.parse(rawData);

	const userConfig = vscode.workspace.getConfiguration('spellwise').get<SyntaxMap>('languageSyntax') || {};

	const finalConfig: SyntaxMap = { ...builtInConfig, ...userConfig };

	return finalConfig;
}

export function handleEditorChange(editor: vscode.TextEditor | undefined, context: vscode.ExtensionContext) {
	if (!editor) {return;}

    // Cargar la configuración de sintaxis si no se ha cargado aún
	if (Object.keys(languageConfig).length === 0) {
		languageConfig = loadSintaxConfig(context);
	}

	const languageId = getCodeIdentifier();
	const syntax = languageConfig[languageId];

	if (syntax) {
		console.log(`Sintaxis de lenguaje para ${languageId}:`, syntax);
		updateStatusBar(languageId);
		// logica para manejar comentarios y delimitadores de cadenas

		if (isTextSelected()) {
			const selectedText = getSelectedText();
			console.log(`Texto seleccionado: ${selectedText}`);
		} else {
			const lineText = getCommentInLine(syntax);
			if (lineText) {
				console.log(`Comentario en la línea actual: ${lineText}`);
			} else {
				console.log('No hay texto en la línea actual o no se encontraron comentarios.');
			}
		}
	} else {
		updateStatusBar(languageId, 'inactive');
	}
}
