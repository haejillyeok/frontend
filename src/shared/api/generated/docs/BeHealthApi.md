# BeHealthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**beApiHealthCheck**](BeHealthApi.md#beapihealthcheck) | **GET** /api/v1/health | BE API 헬스 체크 |
| [**beRootHealthCheck**](BeHealthApi.md#beroothealthcheck) | **GET** /health | BE 루트 헬스 체크 |



## beApiHealthCheck

> SuccessResponseHealthResponse beApiHealthCheck()

BE API 헬스 체크

API 클라이언트용 공통 응답 envelope로 서비스 상태를 반환합니다.

### Example

```ts
import {
  Configuration,
  BeHealthApi,
} from '';
import type { BeApiHealthCheckRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BeHealthApi();

  try {
    const data = await api.beApiHealthCheck();
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

[**SuccessResponseHealthResponse**](SuccessResponseHealthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## beRootHealthCheck

> HealthResponse beRootHealthCheck()

BE 루트 헬스 체크

### Example

```ts
import {
  Configuration,
  BeHealthApi,
} from '';
import type { BeRootHealthCheckRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BeHealthApi();

  try {
    const data = await api.beRootHealthCheck();
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

[**HealthResponse**](HealthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
