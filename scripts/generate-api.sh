#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

OAG_IMAGE="${OAG_IMAGE:-openapitools/openapi-generator-cli:v7.23.0}"
OAG_URL="${OAG_URL:-https://api.haejillyeok.com/openapi.json}"
OUTPUT_DIR="${PROJECT_ROOT}/src/shared/api/generated"

if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker 명령을 찾을 수 없습니다. Docker Desktop을 설치한 뒤 다시 시도하세요."
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker에 연결할 수 없습니다. Docker Desktop을 먼저 실행한 뒤 다시 시도하세요."
  exit 1
fi

TMP_OUTPUT_DIR="$(mktemp -d "${PROJECT_ROOT}/.oag-generated.XXXXXX")"
LOG_FILE="$(mktemp /tmp/generate-api.XXXXXX.log)"

cleanup() {
  rm -rf "${TMP_OUTPUT_DIR}"
  rm -f "${LOG_FILE}"
}

patch_generated_client() {
  local error_code_info_file="${TMP_OUTPUT_DIR}/models/ErrorCodeInfo.ts"
  local null_model_file="${TMP_OUTPUT_DIR}/models/Null.ts"
  local models_index_file="${TMP_OUTPUT_DIR}/models/index.ts"

  if [ ! -f "${error_code_info_file}" ]; then
    echo "⚠️  ErrorCodeInfo.ts 파일을 찾을 수 없어 any 타입 보정을 건너뜁니다."
  else
    echo "🛠️  OpenAPI 3.1 any 타입 출력을 보정합니다..."
    perl -0pi -e "s/details\\?:\\s+\\| null;/details?: unknown | null;/g" "${error_code_info_file}"
    perl -0pi -e "s/FromJSON\\(json\\['details'\\]\\)/json['details']/g" "${error_code_info_file}"
    perl -0pi -e "s/ToJSON\\(value\\['details'\\]\\)/value['details']/g" "${error_code_info_file}"
  fi

  if [ ! -f "${null_model_file}" ]; then
    echo "🛠️  OpenAPI 3.1 null 타입 모델을 보완합니다..."
    cat >"${null_model_file}" <<'EOF'
/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is added by scripts/generate-api.sh because the
 * typescript-fetch generator imports a Null model for OpenAPI 3.1
 * `type: null` schemas but does not emit the model file.
 */

export type Null = null;

export function instanceOfNull(value: unknown): value is Null {
    return value === null;
}

export function NullFromJSON(json: any): Null {
    return NullFromJSONTyped(json, false);
}

export function NullFromJSONTyped(json: any, ignoreDiscriminator: boolean): Null {
    return json == null ? null : json;
}

export function NullToJSON(json: any): Null {
    return NullToJSONTyped(json, false);
}

export function NullToJSONTyped(value?: Null | null, ignoreDiscriminator: boolean = false): any {
    return value == null ? null : value;
}
EOF
  fi

  if [ -f "${models_index_file}" ] && ! grep -q "export \\* from './Null';" "${models_index_file}"; then
    echo "export * from './Null';" >>"${models_index_file}"
  fi
}

normalize_generated_files() {
  echo "🧹 생성 파일의 불필요한 공백을 정리합니다..."
  find "${TMP_OUTPUT_DIR}" -type f \( -name "*.ts" -o -name "*.md" \) \
    -exec perl -0pi -e 's/[ \t]+$//mg; s/\n+\z/\n/' {} +
}

trap cleanup EXIT

echo "✅ 프로젝트 루트=${PROJECT_ROOT}"
echo "✅ OAG_IMAGE=${OAG_IMAGE}"
echo "✅ OAG_URL=${OAG_URL}"
echo "✅ 출력 경로=${OUTPUT_DIR}"
echo "⏳ API 클라이언트를 생성합니다..."

if docker run --rm \
  --user "$(id -u):$(id -g)" \
  -v "${PROJECT_ROOT}":/local \
  "${OAG_IMAGE}" generate \
    -i "${OAG_URL}" \
    -g typescript-fetch \
    -o "/local/$(basename "${TMP_OUTPUT_DIR}")" \
    --additional-properties=supportsES6=true,modelPropertyNaming=original,paramNaming=camelCase \
    >"${LOG_FILE}" 2>&1; then
  patch_generated_client
  normalize_generated_files
  rm -rf "${OUTPUT_DIR}"
  mkdir -p "$(dirname "${OUTPUT_DIR}")"
  mv "${TMP_OUTPUT_DIR}" "${OUTPUT_DIR}"
  echo "✅ API 클라이언트 생성 완료: ${OUTPUT_DIR}"
else
  status=$?
  echo "❌ API 클라이언트 생성 실패. 전체 로그:"
  cat "${LOG_FILE}"
  exit "${status}"
fi
