import getColors from 'get-image-colors';
import https from 'node:https';

/**
 * @param {String} url Get color pallet from this image source.
 * @description Only use this function in server side!
 * */
async function getColorFromImage(url: string) {
    const buffer = await new Promise<Buffer>((resolve, reject) => {
        https.get(url, res => {
            let buffer: Buffer[] = [];
            res.on('data', (chunk) => {
                buffer.push(chunk);
            });
            res.on('end', () => {
                resolve(Buffer.concat(buffer));
            });
            res.on('error', () => {
                reject
            });
        });
    });
    const colors = await getColors(buffer, 'image/png');
    return colors.reduce((prev, current) => {
        prev.push(current.css());
        return prev;
    }, [] as string[]);
}

export default getColorFromImage;