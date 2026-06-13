
# AuthUserResponse


## Properties

Name | Type
------------ | -------------
`public_id` | string
`account_id` | string
`nickname` | string

## Example

```typescript
import type { AuthUserResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "public_id": null,
  "account_id": null,
  "nickname": null,
} satisfies AuthUserResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthUserResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
