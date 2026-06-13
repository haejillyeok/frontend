
# StartGameSessionResponse


## Properties

Name | Type
------------ | -------------
`game_session_public_id` | string
`room_public_id` | string
`game_type` | [GameType](GameType.md)
`status` | [GameSessionStatus](GameSessionStatus.md)
`game_session_token` | string
`game_session_token_expires_at` | Date
`participants` | [Array&lt;GameSessionParticipantResponse&gt;](GameSessionParticipantResponse.md)

## Example

```typescript
import type { StartGameSessionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "game_session_public_id": null,
  "room_public_id": null,
  "game_type": null,
  "status": null,
  "game_session_token": null,
  "game_session_token_expires_at": null,
  "participants": null,
} satisfies StartGameSessionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StartGameSessionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
