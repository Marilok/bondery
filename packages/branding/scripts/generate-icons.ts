import sharp from "sharp";
import { existsSync, mkdirSync, copyFileSync } from "fs";
import { join, dirname } from "path";

export interface IconConfig {
  name: string;
  size?: number;
  format: "png" | "ico" | "svg";
  outDir: string;
}

export interface GenerateIconsOptions {
  svgPath: string;
  icons: IconConfig[];
  baseDir: string;
}

/**
 * Generates icons from an SVG source file
 * @param options - Configuration options for icon generation
 * @param options.svgPath - Absolute path to the source SVG file
 * @param options.icons - Array of icon configurations to generate
 * @param options.baseDir - Base directory for resolving relative output paths (typically __dirname from the calling script)
 */
export async function generateIcons(options: GenerateIconsOptions): Promise<void> {
  const { svgPath, icons, baseDir } = options;

  console.log("🎨 Generating icons from SVG...");

  if (!existsSync(svgPath)) {
    console.error("❌ SVG icon not found at:", svgPath);
    process.exit(1);
  }

  try {
    for (const icon of icons) {
      const outputPath = join(baseDir, icon.outDir, icon.name);
      const outputDir = dirname(outputPath);

      // Ensure output directory exists
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      if (icon.format === "svg") {
        // Copy SVG directly without conversion
        copyFileSync(svgPath, outputPath);
        console.log(`✅ Copied ${icon.name} to ${icon.outDir}`);
      } else {
        // Generate raster images (PNG, ICO)
        if (!icon.size) {
          console.error(`❌ Size is required for ${icon.format} format`);
          process.exit(1);
        }
        await sharp(svgPath).resize(icon.size, icon.size).toFile(outputPath);
        console.log(`✅ Generated ${icon.name} at ${icon.outDir}`);
      }
    }

    console.log("✨ All icons generated successfully!");
  } catch (error) {
    console.error("❌ Error generating icons:", error);
    process.exit(1);
  }
}
