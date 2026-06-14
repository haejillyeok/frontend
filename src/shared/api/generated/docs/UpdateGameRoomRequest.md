
# UpdateGameRoomRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`max_players` | number
`rule_config` | [GameRoomRuleConfigRequest](GameRoomRuleConfigRequest.md)

## Example

```typescript
import type { UpdateGameRoomRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "max_players": null,
  "rule_config": null,
} satisfies UpdateGameRoomRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateGameRoomRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
