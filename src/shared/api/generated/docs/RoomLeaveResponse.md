
# RoomLeaveResponse


## Properties

Name | Type
------------ | -------------
`room_public_id` | string
`user_public_id` | string
`nickname` | string
`left_at` | Date
`remaining_member_count` | number
`new_owner_user_public_id` | string
`new_owner_nickname` | string
`room_closed` | boolean

## Example

```typescript
import type { RoomLeaveResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "room_public_id": null,
  "user_public_id": null,
  "nickname": null,
  "left_at": null,
  "remaining_member_count": null,
  "new_owner_user_public_id": null,
  "new_owner_nickname": null,
  "room_closed": null,
} satisfies RoomLeaveResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoomLeaveResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
