export function prettyPrint(message: string) {
    let result: string[] = [];
    let charsOnLineSoFar = 0;
    message.split(' ').forEach(word => {
        charsOnLineSoFar += word.length;
        if (charsOnLineSoFar >= 80) {
            result.push(`\n${word}`);
            charsOnLineSoFar = 0;
        } else {
            result.push(word)
        }
    });

    console.log(result.join(' '))
}