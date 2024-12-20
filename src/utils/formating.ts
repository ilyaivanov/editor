import { formatWithCursor } from "prettier/standalone";
import * as prettierPluginEstree from "prettier/plugins/estree";
import type { CursorOptions } from "prettier";

export async function formatCode(code: string, cursorOffset: number) {
    try {
        const options: CursorOptions = {
            cursorOffset,
            parser: "typescript",
            plugins: [
                // da fuck I can't figure out how to use this with import
                require("prettier/parser-typescript"),
                prettierPluginEstree,
            ],
            tabWidth: 4,
        };
        return await formatWithCursor(code, options);
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log(e.message);
        } else {
            throw e;
        }
    }
}
