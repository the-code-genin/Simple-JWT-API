import { twig } from "twig";
import path from "path";

export default function renderView(
    rootDir: string,
    viewPath: string,
    params: { [key: string]: any }
): string {
    const template = twig({
        base: path.resolve(rootDir, 'views'),
        path: path.resolve(rootDir, 'views/', viewPath),
        async: false
    });
    return template.render(params);
}