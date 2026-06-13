
# GameSessionParticipantResponse


## Properties

Name | Type
------------ | -------------
`participant_type` | [ParticipantType](ParticipantType.md)
`display_name` | string
`seat_number` | number
`is_uninvited_guest` | boolean

## Example

```typescript
import type { GameSessionParticipantResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "participant_type": null,
  "display_name": null,
  "seat_number": null,
  "is_uninvited_guest": null,
} satisfies GameSessionParticipantResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameSessionParticipantResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
