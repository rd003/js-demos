# 🖼️ Image Compression CLI Tool

A fast, simple, and beautiful command-line tool to compress images (JPG, PNG, WebP, GIF) with high quality. Built with Node.js and Sharp.

## ✨ Features

🚀 Fast compression using Sharp (powered by `libvips`)
📦 Batch processing - compress multiple images at once
🎨 Multiple formats - JPG, PNG, WebP, GIF
📏 Optional resizing - reduce dimensions while compressing
💾 Smart savings - see exactly how much space you saved
🎯 Quality control - adjust compression quality (1-100)
🌈 Beautiful output - colored terminal output with progress indicators
🔒 Safe - never modifies original files

## 📋 Requirements

- Node js

## 📦 Installation

- Clone the repo.
- Open terminal and visit the path where repo is downloaded.
- Execute `npm i` to install dependencies.
- Execute `npm link` to install this package globally.
- verify with `imgcompress --version`

## 🚀 Usage

### Basic examples

```bash
# Compress a single image (default quality: 80%)
imgcompress photo.jpg

# Compress with specific quality
imgcompress photo.jpg --quality 90

# Compress multiple images
imgcompress photo1.jpg photo2.png photo3.webp

# Compress with quality setting
imgcompress photo.jpg --quality 75
```

### Batch processing

```sh
# Compress all JPGs in current folder
imgcompress *.jpg

# Compress all PNGs with quality 85
imgcompress *.png --quality 85

# Compress all images (Windows PowerShell)
imgcompress *.jpg *.png *.webp --quality 80

# Process specific files
imgcompress image1.jpg image2.png image3.webp
```

### With resizing

```sh
# Compress and resize to width 1920px (maintains aspect ratio)
imgcompress photo.jpg --width 1920

# Compress and resize to height 1080px
imgcompress photo.jpg --height 1080

# Combine width and height (fits within bounds)
imgcompress photo.jpg --width 1920 --height 1080

# Resize with specific quality
imgcompress photo.jpg --width 1920 --quality 85
```

### Advance options

```sh
# Save to different folder
imgcompress photo.jpg --output ./compressed

# Save to specific directory
imgcompress *.jpg --output C:\Users\YourName\Pictures\compressed

# Change output filename suffix (default: -compressed)
imgcompress photo.jpg --suffix -optimized
# Output: photo-optimized.jpg

# Remove suffix (overwrite with same name in output folder)
imgcompress photo.jpg --suffix "" --output ./compressed

# Combine all options
imgcompress *.jpg --quality 80 --width 1920 --output ./web-ready --suffix -web
```

### All options

| Option | Shorthand | Description | Default | Example |
|--------|-----------|-------------|---------|---------|
| `--quality <number>` | `-q` | Compression quality (1-100) | 80 | `--quality 90` |
| `--width <number>` | `-w` | Resize width in pixels | - | `--width 1920` |
| `--height <number>` | `-h` | Resize height in pixels | - | `--height 1080` |
| `--output <dir>` | `-o` | Output directory | Same as input | `--output ./compressed` |
| `--suffix <text>` | - | Filename suffix for output | -compressed | `--suffix -small` |
| `--version` | - | Show version number | - | `--version` |
| `--help` | - | Show help | - | `--help` |

---

## 🎯 Quality Guidelines

Choose quality based on your needs:

| Quality Range | Use Case | File Size | Quality Loss |
|--------------|----------|-----------|--------------|
| **90-100** | Archival, printing, portfolio | Largest | Minimal/None |
| **80-90** | General use, sharing photos | Medium | Barely noticeable |
| **70-80** | Web images, social media | Small | Slight but acceptable |
| **50-70** | Thumbnails, previews | Very small | Noticeable |
| **1-50** | Extreme compression | Tiny | Significant |

**Recommended:** Start with 80 and adjust based on results.

## 🗑️ Uninstallation

To remove the global command:

```bash
npm unlink -g imgcompress-cli
```

Or:

```bash
npm uninstall -g imgcompress-cli
```

## Built with

- Node.js 24.1.1 (JavaScript runtime)
- Sharp 0.34.5 (image processing, powered by libvips)
- Commander 14.0.2 (CLI framework)
- Chalk 5.6.2 (terminal colors)
- Ora 9.0.0 (progress spinners)