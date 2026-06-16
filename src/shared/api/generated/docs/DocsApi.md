# DocsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**beWsDocs**](DocsApi.md#bewsdocs) | **GET** /ws-docs | WebSocket API 문서 페이지 |



## beWsDocs

> string beWsDocs()

WebSocket API 문서 페이지

WebSocket API Markdown 원본을 HTML 문서 페이지로 렌더링해 반환합니다.  주요 입력은 없고, 반환값은 &#x60;app/be/api/docs/ws-api.md&#x60; 기반 HTML 응답입니다. 문서 파일이 누락된 경우 HTTP 404로 변환하며 파일 시스템에서 Markdown 파일을 읽는 부작용이 있습니다.

### Example

```ts
import {
  Configuration,
  DocsApi,
} from '';
import type { BeWsDocsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DocsApi();

  try {
    const data = await api.beWsDocs();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/html`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **404** | WebSocket API 문서 원본을 찾을 수 없음 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
