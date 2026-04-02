# enterprise-ui-platform

A framework-agnostic Web Component library for enterprise apps. Built with [Lit](https://lit.dev/), works in React, Vue, Angular, and plain HTML with zero framework lock-in.

---

## Installation

```bash
npm install enterprise-ui-platform
```

---

## Quick Start

### Plain HTML
```html
<!-- 1. Import tokens (once, globally) -->
<link rel="stylesheet" href="node_modules/enterprise-ui-platform/dist/tokens/tokens.css" />

<!-- 2. Import components -->
<script type="module">
  import 'enterprise-ui-platform';
</script>

<!-- 3. Use -->
<org-button variant="primary">Save</org-button>
<org-input label="Email" type="email" placeholder="you@company.com"></org-input>
```

### React
```tsx
import 'enterprise-ui-platform';
import 'enterprise-ui-platform/dist/tokens/tokens.css';

// Components are standard HTML elements — use them like divs
export function SaveForm() {
  return (
    <org-button
      variant="primary"
      onOrg-button:click={(e) => console.log(e.detail)}
    >
      Save
    </org-button>
  );
}
```

> **Tip:** For full TypeScript support in React/JSX, add this to a `.d.ts` file in your project:
> ```ts
> import type {} from 'enterprise-ui-platform';
> declare global {
>   namespace JSX {
>     interface IntrinsicElements {
>       'org-button': any;
>       'org-input': any;
>       'org-select': any;
>       'org-spinner': any;
>       'org-skeleton': any;
>     }
>   }
> }
> ```

### Angular
```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import 'enterprise-ui-platform';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<!-- template -->
<org-input
  label="Search"
  (org-input:input)="onSearch($event.detail.value)"
></org-input>
```

### Vue
```vue
<template>
  <org-button variant="primary" @org-button:click="handleClick">
    Submit
  </org-button>
</template>

<script setup>
import 'enterprise-ui-platform';
</script>
```

---

## Theming

All components use CSS custom properties (tokens). Import `tokens.css` once and override any variable:

```css
/* your-theme.css */
:root {
  --org-color-primary:       #6200ea;   /* purple brand */
  --org-color-primary-hover: #4a00b0;
  --org-btn-radius:          2px;       /* flat buttons */
  --org-font-family:         'Inter', sans-serif;
}
```

See `src/tokens/tokens.css` for the full list of available tokens.

---

## Components

### `<org-button>`

```html
<org-button variant="primary" size="medium">Click me</org-button>
<org-button variant="secondary">Cancel</org-button>
<org-button variant="danger">Delete</org-button>
<org-button variant="ghost">Learn more</org-button>

<!-- Loading state -->
<org-button loading>Saving...</org-button>

<!-- Disabled -->
<org-button disabled>Not available</org-button>

<!-- With icon slot -->
<org-button variant="primary">
  <span slot="icon">🔍</span>
  Search
</org-button>
```

| Property  | Type                                       | Default     |
|-----------|--------------------------------------------|-------------|
| `variant` | `primary \| secondary \| danger \| ghost`  | `primary`   |
| `size`    | `small \| medium \| large`                 | `medium`    |
| `disabled`| `boolean`                                  | `false`     |
| `loading` | `boolean`                                  | `false`     |
| `type`    | `button \| submit \| reset`                | `button`    |
| `ariaLabel` | `string`                                 | `''`        |

**Events:** `org-button:click` → `{ originalEvent: MouseEvent }`

**CSS Parts:** `org-button::part(button) { ... }`

**CSS Tokens:** `--org-btn-primary-bg`, `--org-btn-radius`, `--org-btn-focus-ring`

---

### `<org-input>`

```html
<!-- Basic -->
<org-input label="Full name" placeholder="Jane Doe"></org-input>

<!-- With validation -->
<org-input
  label="Email"
  type="email"
  required
  error="Please enter a valid email"
></org-input>

<!-- Success state -->
<org-input label="Username" value="jdoe" success="Username is available"></org-input>

<!-- With character count -->
<org-input label="Bio" maxlength="160" helper="Tell us about yourself"></org-input>

<!-- With prefix/suffix slots -->
<org-input label="Search" placeholder="Search vendors...">
  <span slot="prefix">🔍</span>
</org-input>

<!-- Sizes -->
<org-input size="small" placeholder="Small"></org-input>
<org-input size="large" placeholder="Large"></org-input>
```

| Property      | Type                                                   | Default  |
|---------------|--------------------------------------------------------|----------|
| `label`       | `string`                                               | `''`     |
| `value`       | `string`                                               | `''`     |
| `type`        | `text \| email \| password \| number \| search \| tel` | `text`   |
| `placeholder` | `string`                                               | `''`     |
| `disabled`    | `boolean`                                              | `false`  |
| `required`    | `boolean`                                              | `false`  |
| `readonly`    | `boolean`                                              | `false`  |
| `error`       | `string`                                               | `''`     |
| `success`     | `string`                                               | `''`     |
| `helper`      | `string`                                               | `''`     |
| `maxlength`   | `number`                                               | —        |
| `size`        | `small \| medium \| large`                             | `medium` |

**Events:** `org-input:input`, `org-input:change`, `org-input:focus`, `org-input:blur`
All carry `{ value: string }` in `event.detail`.

**CSS Parts:** `org-input::part(input)`, `::part(label)`, `::part(helper)`

---

### `<org-select>`

```html
<!-- Basic -->
<org-select
  label="Country"
  placeholder="Select country"
  .options="${[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'in', label: 'India' },
  ]}"
></org-select>

<!-- Searchable -->
<org-select label="Vendor" searchable .options="${vendorList}"></org-select>

<!-- Multi-select -->
<org-select label="Tags" multiple .options="${tagOptions}"></org-select>

<!-- Grouped options -->
<org-select
  label="Category"
  .options="${[
    { value: 'react',   label: 'React',   group: 'Frontend' },
    { value: 'vue',     label: 'Vue',     group: 'Frontend' },
    { value: 'node',    label: 'Node.js', group: 'Backend'  },
  ]}"
></org-select>

<!-- With validation -->
<org-select label="Role" required error="Please select a role" .options="${roles}"></org-select>
```

| Property      | Type                         | Default             |
|---------------|------------------------------|---------------------|
| `label`       | `string`                     | `''`                |
| `options`     | `SelectOption[]`             | `[]`                |
| `value`       | `string`                     | `''`                |
| `values`      | `string[]`                   | `[]`                |
| `multiple`    | `boolean`                    | `false`             |
| `searchable`  | `boolean`                    | `false`             |
| `placeholder` | `string`                     | `'Select an option'`|
| `disabled`    | `boolean`                    | `false`             |
| `error`       | `string`                     | `''`                |
| `size`        | `small \| medium \| large`   | `medium`            |

```ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}
```

**Events:** `org-select:change` → `{ value, values, option }`

---

### `<org-spinner>`

```html
<org-spinner></org-spinner>
<org-spinner size="small" label=""></org-spinner>
<org-spinner size="large" label="Loading vendors..."></org-spinner>
<org-spinner color="#6200ea"></org-spinner>
```

| Property | Type                              | Default      |
|----------|-----------------------------------|--------------|
| `size`   | `small \| medium \| large \| xlarge` | `medium`  |
| `color`  | `string`                          | (token)      |
| `label`  | `string`                          | `Loading...` |

---

### `<org-skeleton>`

```html
<!-- Text lines -->
<org-skeleton variant="text" lines="3"></org-skeleton>

<!-- Circle (avatar) -->
<org-skeleton variant="circle" width="40px"></org-skeleton>

<!-- Rectangle (image placeholder) -->
<org-skeleton variant="rect" width="100%" height="200px"></org-skeleton>

<!-- Card -->
<org-skeleton variant="card"></org-skeleton>

<!-- No animation -->
<org-skeleton variant="text" animated="false"></org-skeleton>
```

| Property   | Type                             | Default |
|------------|----------------------------------|---------|
| `variant`  | `text \| circle \| rect \| card` | `text`  |
| `width`    | `string`                         | `''`    |
| `height`   | `string`                         | `''`    |
| `lines`    | `number`                         | `3`     |
| `animated` | `boolean`                        | `true`  |

---

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Auto-generate stories for all components
npm run generate:stories

# Build the library
npm run build

# Run tests
npm test
```

### Adding a new component

1. Create `src/components/my-component.ts`
2. Add `@customElement('org-my-component')` decorator
3. Export from `src/index.ts`
4. Run `npm run generate:stories` — story is auto-created
5. Customise the story in `src/stories/` if needed

---

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). Web Components are natively supported in all of these.

For IE11 support, use the `@webcomponents/webcomponentsjs` polyfill.

---

## License

ISC
