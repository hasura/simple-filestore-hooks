`simple-filestore-hooks` is a repo that has a simple filestore authorization
webhook for Hasura that sets up the following authorizations:

1) Create: Any logged in user can upload a file
2) Delete: Not allowed (except for admin users)
3) Read: Any user (including anonymous)

# Usage with Hasura

#### Add this as a git push microservice on Hasura
1. Add a `git-push` service via the Hasura console, named `filestore-check`
2. Run: `git clone https://github.com/hasura/simple-filestore-hooks.git`
2. `cd simple-filestore-hooks`
3. Get the hasura remote URL from the hasura console: `git remote add hasura <your-hasura-git-remote-url>` 
4. Run: `git push hasura master`

#### Use the authorization hook in the filestore

1. On the console head to Filestore > Manage permissions (`/filestore/permissions`)
2. Add this authorization hook: `http://filestore-check.default/public-read`

