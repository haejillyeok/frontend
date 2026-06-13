
# GameRoomListResponse


## Properties

Name | Type
------------ | -------------
`rooms` | [Array&lt;GameRoomSummaryResponse&gt;](GameRoomSummaryResponse.md)
`current_membership` | [CurrentLobbyMembershipResponse](CurrentLobbyMembershipResponse.md)

## Example

```typescript
import type { GameRoomListResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "rooms": null,
  "current_membership": null,
} satisfies GameRoomListResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameRoomListResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
