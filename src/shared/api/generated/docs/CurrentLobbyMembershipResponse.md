
# CurrentLobbyMembershipResponse


## Properties

Name | Type
------------ | -------------
`room_public_id` | string
`name` | string
`game_type` | [GameType](GameType.md)
`status` | [RoomStatus](RoomStatus.md)
`max_players` | number
`member_count` | number
`is_owner` | boolean
`lobby_websocket_path` | string

## Example

```typescript
import type { CurrentLobbyMembershipResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "room_public_id": null,
  "name": null,
  "game_type": null,
  "status": null,
  "max_players": null,
  "member_count": null,
  "is_owner": null,
  "lobby_websocket_path": null,
} satisfies CurrentLobbyMembershipResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CurrentLobbyMembershipResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
