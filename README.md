# ExampleNxProject

## Nx/Angular schematics

### Create a new shared page component

```bash
npx nx g @nx/angular:component libs/angular-shared/src/lib/pages/home-page/home-page \
--standalone=true \
--export=true
```

### Create a new shared component

```bash
npx nx g @nx/angular:component libs/angular-shared/src/lib/components/footer-component/footer-component \
--standalone=true \
--export=true
```

### Create a new shared service

```bash
npx nx g @nx/angular:service libs/angular-shared/src/lib/services/http-service/http-service
```

## Git

### Squash local master history

```bash
# DO THIS ONLY WHEN FULLY UNDERSTOOD WHAT IT DOES
# THIS WILL SQUASH THE LOCAL MASTER INTO 1 COMMIT
# THIS IS IRREVERSIBLE AND WILL WIPE THE HISTORY LOCALY
git reset $(git commit-tree HEAD^{tree} -m "0.1.0") && git tag 0.1.0
```

### Purge remote master history

```bash
# DO THIS ONLY WHEN FULLY UNDERSTOOD WHAT IT DOES
# THIS WILL FORCE PUSH THE LOCAL SQUASHED HISTORY INTO THE REMOTE
# THIS IS IRREVERSIBLE AND WILL WIPE THE HISTORY IN THE REMOTE
git push origin HEAD --force --tags
```
