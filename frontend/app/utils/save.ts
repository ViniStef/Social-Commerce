import path from "node:path";
import process from "node:process";
import fs from "node:fs";

export async function saveImageToFiles(image: File): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public/000001");
    const filename = `${crypto.randomUUID()}-${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, filename);

    fs.mkdirSync(uploadDir, {recursive: true});
    const arrayBuffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    return `public/000001/${filename}`;
}