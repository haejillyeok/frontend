# AuthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**beAuthLogin**](AuthApi.md#beauthlogin) | **POST** /api/v1/auth/login | 로그인 |
| [**beAuthSignup**](AuthApi.md#beauthsignup) | **POST** /api/v1/auth/signup | 회원가입 |



## beAuthLogin

> SuccessResponseLoginResponse beAuthLogin(loginRequest)

로그인

계정 ID/비밀번호로 기존 계정을 인증하고 세션 쿠키를 발급합니다.

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


## beAuthSignup

> SuccessResponseSignupResponse beAuthSignup(signupRequest)

회원가입

계정 ID/닉네임/비밀번호로 신규 계정을 만들고 세션 쿠키를 발급합니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { BeAuthSignupRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // SignupRequest
    signupRequest: ...,
  } satisfies BeAuthSignupRequest;

  try {
    const data = await api.beAuthSignup(body);
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
| **signupRequest** | [SignupRequest](SignupRequest.md) |  | |

### Return type

[**SuccessResponseSignupResponse**](SuccessResponseSignupResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Successful Response |  -  |
| **409** | Conflict errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
