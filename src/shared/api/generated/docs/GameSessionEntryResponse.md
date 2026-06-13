
# GameSessionEntryResponse


## Properties

Name | Type
------------ | -------------
`game_session_public_id` | string
`allowed` | boolean
`game_session_token` | string
`game_session_token_expires_at` | Date
`participant` | [GameSessionParticipantResponse](GameSessionParticipantResponse.md)

## Example

```typescript
import type { GameSessionEntryResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "game_session_public_id": null,
  "allowed": null,
  "game_session_token": null,
  "game_session_token_expires_at": null,
  "participant": null,
} satisfies GameSessionEntryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameSessionEntryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
