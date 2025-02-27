# js-common
A JavaScript library that provides essential utilities and reusable components to simplify development and enhance interaction with MyCoRe-based applications.

## Add package
### npm/yarn environment
```
npx jsr add @mycore/js-common
```

## Usage example
```ts
import { LangService } from '@mycore/js-common/i18n';

const langService = new LangService(BASE_URL);
console.log(langService.getLanguages());
```

