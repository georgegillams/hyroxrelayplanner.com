# Custom data types

## Blogs

db key: `blogs`

| name                  | type          | source | description     |
| --------------------- | ------------- | ------ | --------------- |
| title                 | string        | stored |                 |
| tags                  | array<string> | stored |                 |
| blogCardDate          | string        | stored |                 |
| blogBannerColor       | string        | stored | valid css color |
| blogImage             | string        | stored | url to image    |
| light                 | bool          | stored |                 |
| published             | bool          | stored |                 |
| publishedTimestamp    | number        | stored |                 |
| showInBlogsList       | bool          | stored |                 |
| showInTravelBlogsList | bool          | stored |                 |

## Support

db key: `support`

| name        | type   | source | description |
| ----------- | ------ | ------ | ----------- |
| name        | string | stored |             |
| description | string | stored |             |
| url         | string | stored |             |
