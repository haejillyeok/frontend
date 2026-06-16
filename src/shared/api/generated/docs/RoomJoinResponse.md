
# RoomJoinResponse


## Properties

Name | Type
------------ | -------------
`room_public_id` | string
`user_public_id` | string
`nickname` | string
`joined_at` | Date
`already_member` | boolean

## Example

```typescript
import type { RoomJoinResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "room_public_id": null,
  "user_public_id": null,
  "nickname": null,
  "joined_at": null,
  "already_member": null,
} satisfies RoomJoinResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoomJoinResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
