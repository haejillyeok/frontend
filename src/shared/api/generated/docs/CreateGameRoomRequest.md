
# CreateGameRoomRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`game_type` | [GameType](GameType.md)
`max_players` | number

## Example

```typescript
import type { CreateGameRoomRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "game_type": null,
  "max_players": null,
} satisfies CreateGameRoomRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateGameRoomRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
