import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'src/assets/images';
const outputDir = 'src/assets/images/webp';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// 허용 확장자
const validExts = ['.png', '.jpg', '.jpeg'];

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (!validExts.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

  // 원본 파일 크기
  const inputSize = fs.statSync(inputPath).size;

  // PNG는 무손실, JPG는 품질 80 기본
  const options = ext === '.png' ? { lossless: true, effort: 5 } : { quality: 80, effort: 5 };

  sharp(inputPath)
    .webp(options)
    .toFile(outputPath)
    .then((info) => {
      const outputSize = info.size ?? fs.statSync(outputPath).size;
      console.log(`${file} (${formatBytes(inputSize)}) → ${path.basename(outputPath)} (${formatBytes(outputSize)})`);
    })
    .catch((err) => console.error(`❌ ${file}:`, err));
});
