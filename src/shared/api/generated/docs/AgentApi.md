# AgentApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**beAgentHealthCheck**](AgentApi.md#beagenthealthcheck) | **GET** /api/v1/agent/health | Agent 헬스 체크 |



## beAgentHealthCheck

> SuccessResponseHealthResponse beAgentHealthCheck()

Agent 헬스 체크

BE에서 Agent &#x60;/api/v1/health&#x60;를 호출해 Agent 상태를 반환합니다.

### Example

```ts
import {
  Configuration,
  AgentApi,
} from '';
import type { BeAgentHealthCheckRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AgentApi();

  try {
    const data = await api.beAgentHealthCheck();
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
| **502** | Internal errors |  -  |
| **503** | Internal errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
