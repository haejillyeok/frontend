# GameApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**beGameCreateRoom**](GameApi.md#begamecreateroom) | **POST** /api/v1/game/rooms | 로비 객실 생성 |
| [**beGameJoinRoom**](GameApi.md#begamejoinroom) | **POST** /api/v1/game/rooms/{room_public_id}/join | 로비 객실 참여 |
| [**beGameLeaveRoom**](GameApi.md#begameleaveroom) | **POST** /api/v1/game/rooms/{room_public_id}/leave | 로비 객실 퇴장 |
| [**beGameListRooms**](GameApi.md#begamelistrooms) | **GET** /api/v1/game/rooms | 로비 객실 목록 조회 |
| [**beGameSessionEntry**](GameApi.md#begamesessionentry) | **GET** /api/v1/game/sessions/{game_session_public_id}/entry | 게임 세션 진입 권한 확인 |
| [**beGameStartSession**](GameApi.md#begamestartsession) | **POST** /api/v1/game/rooms/{room_public_id}/start | 게임 세션 시작 |



## beGameCreateRoom

> SuccessResponseCreateGameRoomResponse beGameCreateRoom(createGameRoomRequest, sessionToken)

로비 객실 생성

로그인 유저를 방장으로 하는 대기 객실을 만들고 방장 멤버십을 함께 등록합니다.

### Example

```ts
import {
  Configuration,
  GameApi,
} from '';
import type { BeGameCreateRoomRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GameApi();

  const body = {
    // CreateGameRoomRequest
    createGameRoomRequest: ...,
    // string (optional)
    sessionToken: sessionToken_example,
  } satisfies BeGameCreateRoomRequest;

  try {
    const data = await api.beGameCreateRoom(body);
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
| **createGameRoomRequest** | [CreateGameRoomRequest](CreateGameRoomRequest.md) |  | |
| **sessionToken** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessResponseCreateGameRoomResponse**](SuccessResponseCreateGameRoomResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## beGameJoinRoom

> SuccessResponseRoomJoinResponse beGameJoinRoom(roomPublicId, sessionToken)

로비 객실 참여

로그인 유저를 대기 중인 객실 멤버로 참여시키고 로비 구독자에게 알립니다.

### Example

```ts
import {
  Configuration,
  GameApi,
} from '';
import type { BeGameJoinRoomRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GameApi();

  const body = {
    // string
    roomPublicId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    sessionToken: sessionToken_example,
  } satisfies BeGameJoinRoomRequest;

  try {
    const data = await api.beGameJoinRoom(body);
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
| **roomPublicId** | `string` |  | [Defaults to `undefined`] |
| **sessionToken** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessResponseRoomJoinResponse**](SuccessResponseRoomJoinResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **404** | Not found errors |  -  |
| **409** | Conflict errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## beGameLeaveRoom

> SuccessResponseRoomLeaveResponse beGameLeaveRoom(roomPublicId, sessionToken)

로비 객실 퇴장

로그인 유저를 대기 객실에서 퇴장시키고 같은 방 구독자에게 알립니다.

### Example

```ts
import {
  Configuration,
  GameApi,
} from '';
import type { BeGameLeaveRoomRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GameApi();

  const body = {
    // string
    roomPublicId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    sessionToken: sessionToken_example,
  } satisfies BeGameLeaveRoomRequest;

  try {
    const data = await api.beGameLeaveRoom(body);
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
| **roomPublicId** | `string` |  | [Defaults to `undefined`] |
| **sessionToken** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessResponseRoomLeaveResponse**](SuccessResponseRoomLeaveResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **404** | Not found errors |  -  |
| **403** | Authorization errors |  -  |
| **409** | Conflict errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## beGameListRooms

> SuccessResponseGameRoomListResponse beGameListRooms(sessionToken)

로비 객실 목록 조회

로그인 유저가 로비에서 선택할 수 있는 객실 목록을 조회합니다.

### Example

```ts
import {
  Configuration,
  GameApi,
} from '';
import type { BeGameListRoomsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GameApi();

  const body = {
    // string (optional)
    sessionToken: sessionToken_example,
  } satisfies BeGameListRoomsRequest;

  try {
    const data = await api.beGameListRooms(body);
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
| **sessionToken** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessResponseGameRoomListResponse**](SuccessResponseGameRoomListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## beGameSessionEntry

> SuccessResponseGameSessionEntryResponse beGameSessionEntry(gameSessionPublicId, sessionToken)

게임 세션 진입 권한 확인

로그인 유저가 게임 시작 시 확정된 참가자인지 확인합니다.

### Example

```ts
import {
  Configuration,
  GameApi,
} from '';
import type { BeGameSessionEntryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GameApi();

  const body = {
    // string
    gameSessionPublicId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    sessionToken: sessionToken_example,
  } satisfies BeGameSessionEntryRequest;

  try {
    const data = await api.beGameSessionEntry(body);
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
| **gameSessionPublicId** | `string` |  | [Defaults to `undefined`] |
| **sessionToken** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessResponseGameSessionEntryResponse**](SuccessResponseGameSessionEntryResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **403** | Authorization errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## beGameStartSession

> SuccessResponseStartGameSessionResponse beGameStartSession(roomPublicId, sessionToken)

게임 세션 시작

방장이 활성 room member를 고정하고 게임 세션 진입 식별자를 발급합니다.

### Example

```ts
import {
  Configuration,
  GameApi,
} from '';
import type { BeGameStartSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GameApi();

  const body = {
    // string
    roomPublicId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    sessionToken: sessionToken_example,
  } satisfies BeGameStartSessionRequest;

  try {
    const data = await api.beGameStartSession(body);
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
| **roomPublicId** | `string` |  | [Defaults to `undefined`] |
| **sessionToken** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessResponseStartGameSessionResponse**](SuccessResponseStartGameSessionResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **401** | Authentication errors |  -  |
| **404** | Not found errors |  -  |
| **403** | Authorization errors |  -  |
| **409** | Conflict errors |  -  |
| **422** | Validation errors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
