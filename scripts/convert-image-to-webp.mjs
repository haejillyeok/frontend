#!/usr/bin/env node

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const defaultQuality = 85;
const supportedInputExtensions = new Set([".jpeg", ".jpg", ".png"]);

function printUsage() {
  console.error(
    [
      "사용법:",
      "  pnpm image:webp -- <input-path> [output-path] [--quality N]",
      "",
      "예시:",
      "  pnpm image:webp -- src/pages/home/ui/hero-bg.png",
      "  pnpm image:webp -- src/pages/home/ui/hero-bg.png src/pages/home/ui/hero-bg.webp",
      "  pnpm image:webp -- src/pages/home/ui/hero-bg.png /tmp/hero-bg.webp --quality 90",
    ].join("\n"),
  );
}

function fail(message) {
  console.error(`오류: ${message}`);
  printUsage();
  process.exit(1);
}

function parseArgs(argv) {
  const positional = [];
  let quality = defaultQuality;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--") {
      continue;
    }

    if (arg === "--quality") {
      const qualityValue = argv[index + 1];

      if (!qualityValue) {
        fail("--quality 옵션에는 값이 필요합니다.");
      }

      const parsedQuality = Number(qualityValue);

      if (
        !Number.isInteger(parsedQuality) ||
        parsedQuality < 1 ||
        parsedQuality > 100
      ) {
        fail("--quality 값은 1부터 100까지의 정수여야 합니다.");
      }

      quality = parsedQuality;
      index += 1;
      continue;
    }

    if (arg.startsWith("-")) {
      fail(`알 수 없는 옵션입니다: ${arg}`);
    }

    positional.push(arg);
  }

  if (positional.length < 1 || positional.length > 2) {
    fail("입력 경로는 필수이고, 출력 경로는 선택입니다.");
  }

  const inputPath = path.resolve(positional[0]);
  const outputPath =
    positional[1] ??
    path.join(
      path.dirname(inputPath),
      `${path.basename(inputPath, path.extname(inputPath))}.webp`,
    );

  return {
    inputPath,
    outputPath: path.resolve(outputPath),
    quality,
  };
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function resolveAvailableOutputPath(outputPath) {
  if (!(await pathExists(outputPath))) {
    return outputPath;
  }

  const directory = path.dirname(outputPath);
  const extension = path.extname(outputPath);
  const baseName = path.basename(outputPath, extension);

  for (let index = 1; index < Number.MAX_SAFE_INTEGER; index += 1) {
    const candidatePath = path.join(
      directory,
      `${baseName} (${index})${extension}`,
    );

    if (!(await pathExists(candidatePath))) {
      return candidatePath;
    }
  }

  fail(`사용 가능한 출력 파일명을 찾을 수 없습니다: ${outputPath}`);
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatPath(targetPath) {
  const relativePath = path.relative(process.cwd(), targetPath);

  if (relativePath === "" || relativePath.startsWith("..")) {
    return targetPath;
  }

  return relativePath;
}

async function main() {
  const { inputPath, outputPath, quality } = parseArgs(process.argv.slice(2));

  const inputExtension = path.extname(inputPath).toLowerCase();
  const outputExtension = path.extname(outputPath).toLowerCase();

  if (inputExtension === ".webp") {
    fail("입력 파일은 이미 WebP 이미지입니다.");
  }

  if (!supportedInputExtensions.has(inputExtension)) {
    fail(
      `입력 확장자는 다음 중 하나여야 합니다: ${Array.from(
        supportedInputExtensions,
      ).join(", ")}.`,
    );
  }

  if (outputExtension !== ".webp") {
    fail("출력 경로는 .webp로 끝나야 합니다.");
  }

  const inputStats = await stat(inputPath).catch((error) => {
    if (error?.code === "ENOENT") {
      fail(`입력 파일이 존재하지 않습니다: ${inputPath}`);
    }

    throw error;
  });

  if (!inputStats.isFile()) {
    fail(`입력 경로가 파일이 아닙니다: ${inputPath}`);
  }

  const availableOutputPath = await resolveAvailableOutputPath(outputPath);

  await mkdir(path.dirname(availableOutputPath), { recursive: true });

  await sharp(inputPath).webp({ quality }).toFile(availableOutputPath);

  const outputStats = await stat(availableOutputPath);
  const savedBytes = inputStats.size - outputStats.size;
  const savedPercent =
    inputStats.size === 0 ? 0 : (savedBytes / inputStats.size) * 100;

  console.log(`변환 완료: ${formatPath(inputPath)}`);
  console.log(`출력 경로: ${formatPath(availableOutputPath)}`);
  console.log(`품질: ${quality}`);
  console.log(
    `파일 크기: ${formatBytes(inputStats.size)} -> ${formatBytes(
      outputStats.size,
    )} (${savedPercent.toFixed(1)}% 절감)`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
