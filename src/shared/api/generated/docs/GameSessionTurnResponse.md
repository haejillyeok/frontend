
# GameSessionTurnResponse


## Properties

Name | Type
------------ | -------------
`phase_id` | string
`round_number` | number
`turn_number` | number
`actor_seat_number` | number
`started_at` | Date
`deadline_at` | Date
`required_start_char` | string

## Example

```typescript
import type { GameSessionTurnResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "phase_id": null,
  "round_number": null,
  "turn_number": null,
  "actor_seat_number": null,
  "started_at": null,
  "deadline_at": null,
  "required_start_char": null,
} satisfies GameSessionTurnResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameSessionTurnResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
