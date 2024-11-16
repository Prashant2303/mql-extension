export function parseName(url: URL): string {
    let name;
    if (url.hostname === "leetcode.com") {
        name = url.pathname.substring(10);
        return (name[0].toUpperCase() + name.substring(1, name.length - 13)).replaceAll('-', ' ');
    } else {
        return '';
    }
}
