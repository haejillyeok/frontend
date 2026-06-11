# AuthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**beAuthLogin**](AuthApi.md#beauthlogin) | **POST** /api/v1/auth/login | 가입 겸 로그인 |



## beAuthLogin

> SuccessResponseLoginResponse beAuthLogin(loginRequest)

가입 겸 로그인

계정 ID/비밀번호로 가입 겸 로그인을 처리하고 세션 쿠키를 발급합니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { BeAuthLoginRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies BeAuthLoginRequest;

  try {
    const data = await api.beAuthLogin(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**SuccessResponseLoginResponse**](SuccessResponseLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
