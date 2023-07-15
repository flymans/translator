import dictionary from './dictionary';

export const handleTranslate =
    (text, setter) =>
    ({target: {name: lang}}) => {
        setter(
            text
                .split('')
                .map((char) => {
                    const requiredDict = dictionary[lang]?.find((dict) => dict[char]);
                    return requiredDict ? requiredDict[char] : char;
                })
                .join(''),
        );
    };

export const handleTranslateToBBCode = (text, setter) => () => {
    const transformations = [
        // Headers
        {regex: /^#{6} (.*)/gm, replace: '[size=7]$1[/size]'},
        {regex: /^#{5} (.*)/gm, replace: '[size=6]$1[/size]'},
        {regex: /^#{4} (.*)/gm, replace: '[size=5]$1[/size]'},
        {regex: /^#{3} (.*)/gm, replace: '[size=4]$1[/size]'},
        {regex: /^#{2} (.*)/gm, replace: '[size=3]$1[/size]'},
        {regex: /^# (.*)/gm, replace: '[size=2]$1[/size]'},
        // Links
        {regex: /\[([^\]]+)\]\(([^)]+)\)/gm, replace: '[url=$2]$1[/url]'},
        // Images
        {regex: /!\[([^\]]+)\]\(([^)]+)\)/gm, replace: '[img]$2[/img]'},
        // Bold
        {regex: /\*\*([^*]+)\*\*/gm, replace: '[b]$1[/b]'},
        // Italic
        {regex: /\*([^*]+)\*/gm, replace: '[i]$1[/i]'},
        // Strikethrough
        {regex: /~~([^~]+)~~/gm, replace: '[s]$1[/s]'},
        // Unordered list
        {regex: /^(?:[-*+]) (.+)/gm, replace: '[*]$1'},
    ];

    setter(transformations.reduce((bbcode, {regex, replace}) => bbcode.replace(regex, replace), text));
};

export const handleTranslateToMarkdown = (text, setter) => () => {
    const transformations = [
        // Headers
        {regex: /\[size=7\](.*?)\[\/size\]/gs, replace: '###### $1'},
        {regex: /\[size=6\](.*?)\[\/size\]/gs, replace: '##### $1'},
        {regex: /\[size=5\](.*?)\[\/size\]/gs, replace: '#### $1'},
        {regex: /\[size=4\](.*?)\[\/size\]/gs, replace: '### $1'},
        {regex: /\[size=3\](.*?)\[\/size\]/gs, replace: '## $1'},
        {regex: /\[size=2\](.*?)\[\/size\]/gs, replace: '# $1'},
        // Links
        {regex: /\[url=(.*?)\](.*?)\[\/url\]/gs, replace: '[$2]($1)'},
        // Images
        {regex: /\[img\](.*?)\[\/img\]/gs, replace: '![]($1)'},
        // Bold
        {regex: /\[b\](.*?)\[\/b\]/gs, replace: '**$1**'},
        // Italic
        {regex: /\[i\](.*?)\[\/i\]/gs, replace: '*$1*'},
        // Strikethrough
        {regex: /\[s\](.*?)\[\/s\]/gs, replace: '~~$1~~'},
        // Unordered list
        {regex: /\[\*\](.*?)(?=\[\*]|$)/gs, replace: '* $1'},
    ];

    setter(transformations.reduce((markdown, {regex, replace}) => markdown.replace(regex, replace), text));
};
