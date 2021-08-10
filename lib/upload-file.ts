import fs from 'fs';
import path from 'path';
import randomString from './random-string';

export default function UploadFile(fileData: string, to: string): string {
    if (!/^data\:.+\/.+\;base64\,.+$/i.test(fileData)) throw new Error('Invalid file uploaded')

    // Get the file extension
    let mimeType = fileData.split(';')[0].split(':', 2)[1];
    if (!/^.+\/.+$/.test(mimeType)) throw new Error('Invalid file mime.');

    // Get the image name and extension from the upload path
    let fullFileNameArray = path.basename(to).split(".");
    let fileExtension = String(fullFileNameArray.pop()).replace(/[^a-z0-9_]+/ig, '-');
    let fileName = String(fullFileNameArray.join(".")).replace(/[^a-z0-9_]+/ig, '-');
    let parsedFileName = `${fileName}-${randomString()}.${fileExtension}`;

    // Write the file to local storage
    let writeStream = fs.createWriteStream(path.resolve(path.dirname(to), parsedFileName));
    writeStream.write(Buffer.from(fileData.split(',', 2)[1], 'base64'));
    writeStream.close();

    // Return the uploaded file name
    return parsedFileName;
}