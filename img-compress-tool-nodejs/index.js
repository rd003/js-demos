#!/usr/bin/env node

import sharp from "sharp"
import chalk from "chalk"
import ora from "ora"
import { program } from "commander"
import path from "path"
import fs from "node:fs/promises"

program
    .name('imgcompress')
    .description('Compress images (jpg, png, webp, gif) with high quality')
    .version('1.0.0')
    .argument('<files...>', 'Image file(s) to compress')
    .option('-q, --quality <number>', 'Compression quality (1-100)', '80')
    .option('-w, --width <number>', 'Resize width (optional)')
    .option('-h, --height <number>', 'Resize height (optional)')
    .option('-o, --output <dir>', 'Output directory (default: same as input)')
    .option('--suffix <text>', 'Add suffix to output filename', '-compressed')
    .parse(process.argv);

const options = program.opts();
const files = program.args;

// Validate quality
const quality = parseInt(options.quality);
if (isNaN(quality) || quality < 1 || quality > 100) {
    console.error(chalk.red('Error: Quality must be between 1 and 100'));
    process.exit(1);
}

// Format bytes to human readable
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Get output path
function getOutputPath(inputPath) {
    const parsed = path.parse(inputPath);

    if (options.output) {
        return path.join(options.output, parsed.name + options.suffix + parsed.ext);
    }

    return path.join(parsed.dir, parsed.name + options.suffix + parsed.ext);
}

// Compress single image
async function compressImage(filePath) {
    try {
        // Check if file exists
        await fs.access(filePath);

        // Get original file size
        const stats = await fs.stat(filePath);
        const originalSize = stats.size;

        // Get file extension
        const ext = path.extname(filePath).toLowerCase();
        const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

        if (!supportedFormats.includes(ext)) {
            console.log(chalk.yellow(`⚠ Skipping ${path.basename(filePath)} - Unsupported format`));
            return null;
        }

        // Prepare Sharp instance
        let image = sharp(filePath);

        // Apply resize if specified
        if (options.width || options.height) {
            image = image.resize({
                width: options.width ? parseInt(options.width) : null,
                height: options.height ? parseInt(options.height) : null,
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Apply compression based on format
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                image = image.jpeg({ quality, mozjpeg: true });
                break;
            case '.png':
                image = image.png({ quality, compressionLevel: 9 });
                break;
            case '.webp':
                image = image.webp({ quality });
                break;
            case '.gif':
                image = image.gif();
                break;
        }

        // Get output path
        const outputPath = getOutputPath(filePath);

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        await fs.mkdir(outputDir, { recursive: true });

        // Save compressed image
        await image.toFile(outputPath);

        // Get compressed file size
        const compressedStats = await fs.stat(outputPath);
        const compressedSize = compressedStats.size;

        // Calculate savings
        const savedBytes = originalSize - compressedSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

        return {
            fileName: path.basename(filePath),
            outputPath,
            originalSize,
            compressedSize,
            savedBytes,
            savedPercent
        };

    } catch (error) {
        console.error(chalk.red(`✗ Error processing ${path.basename(filePath)}: ${error.message}`));
        return null;
    }
}

// Main function
async function main() {
    console.log(chalk.cyan.bold('\n🖼️  Image Compression Tool\n'));

    if (files.length === 0) {
        console.error(chalk.red('Error: No files specified'));
        process.exit(1);
    }

    // Show settings
    console.log(chalk.gray(`Quality: ${quality}%`));
    if (options.width || options.height) {
        console.log(chalk.gray(`Resize: ${options.width || 'auto'}x${options.height || 'auto'}`));
    }
    if (options.output) {
        console.log(chalk.gray(`Output: ${options.output}`));
    }
    console.log('');

    const results = [];
    let totalOriginal = 0;
    let totalCompressed = 0;

    // Process each file
    for (const file of files) {
        const spinner = ora(`Processing ${path.basename(file)}...`).start();

        const result = await compressImage(file);

        if (result) {
            spinner.succeed(
                chalk.green(`${result.fileName}`) +
                chalk.gray(` → ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)}`) +
                chalk.green(` (${result.savedPercent}% saved)`)
            );

            results.push(result);
            totalOriginal += result.originalSize;
            totalCompressed += result.compressedSize;
        } else {
            spinner.fail();
        }
    }

    // Show summary
    if (results.length > 0) {
        const totalSaved = totalOriginal - totalCompressed;
        const totalPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);

        console.log(chalk.cyan.bold('\n📊 Summary:'));
        console.log(chalk.gray(`Files processed: ${results.length}`));
        console.log(chalk.gray(`Total original size: ${formatBytes(totalOriginal)}`));
        console.log(chalk.gray(`Total compressed size: ${formatBytes(totalCompressed)}`));
        console.log(chalk.green.bold(`Total saved: ${formatBytes(totalSaved)} (${totalPercent}%)\n`));
    }
}

// Run
main().catch(error => {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
});