# DX Lab Website

Node JS React application with server-side rendering for DX Lab's website.

## Getting Started

```
$ git clone git@github.com:slnsw/dxlab-website
$ npm install
# Create up .env
$ npm start
```

### ENV Variables

_Note:_ GRAPHQL_HOST is being proxied to `/api/graphql` on this website. It is possible to use `GRAPHQL_URL=/api/graphql`, but need to test speed a bit more, as that is a lot of proxying!

```
# .env
PORT=5010
TEST=it works!
GRAPHQL_URL=http://localhost:5000/graphql
GRAPHQL_HOST=http://localhost:5000
DXLAB_WP_URL=https://staging-wp.dxlab.sl.nsw.gov.au
GTM_ID=GTM-XXXXXXX
FB_APP_ID=XXXXXXXXXXXXX
NEWSELFWALES_URL=https://xxxxxxxxxxxxxxxx
OFF_THE_SHELF_URL=https://xxxxxxxxxxxxxxxx

# .env.staging
PORT=3000
TEST=it works!
GRAPHQL_URL=https://dxlab.sl.nsw.gov.au/api/graphql
GRAPHQL_HOST=https://dxlab.sl.nsw.gov.au
DXLAB_WP_URL=https://staging-wp.dxlab.sl.nsw.gov.au
GTM_ID=GTM-XXXXXXX
FB_APP_ID=XXXXXXXXXXXXX
NEWSELFWALES_URL=https://xxxxxxxxxxxxxxxx
OFF_THE_SHELF_URL=https://xxxxxxxxxxxxxxxx

# .env.production
PORT=3000
TEST=it works on production!
GRAPHQL_URL=https://dxlab.sl.nsw.gov.au/api/graphql
GRAPHQL_HOST=https://dxlab.sl.nsw.gov.au
DXLAB_WP_URL=https://wp.dxlab.sl.nsw.gov.au
GTM_ID=GTM-XXXXXXX
FB_APP_ID=XXXXXXXXXXXXX
NEWSELFWALES_URL=https://xxxxxxxxxxxxxxxx
OFF_THE_SHELF_URL=https://xxxxxxxxxxxxxxxx
```

# DXLAB_WEBSITE_GRAPHQL_URL in now.josn replaces GRAPHQL_URL in .env files

# similarly for other values...

## Server Setup

```
# SSH into server
# Install nvm and node
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ . ~/.nvm/nvm.sh # Activate nvm
$ nvm install v8.9.3
# Symlink node and npm so they can be run by Ansible (as ubuntu user)
$ sudo ln -s /home/ubuntu/.nvm/versions/node/v8.9.3/bin/node /usr/local/bin/node
$ sudo ln -s /home/ubuntu/.nvm/versions/node/v8.9.3/bin/npm /usr/local/bin/npm
# Set up nginx
$ vim /etc/nginx/sites-available/dxlab.sl.nsw.gov.au.conf
$ ln -s /etc/nginx/sites-available/dxlab.sl.nsw.gov.au.conf /etc/nginx/sites-enabled/dxlab.sl.nsw.gov.au.conf
# Make project folder
$ mkdir /src/www/dxlab.sl.nsw.gov.au
$ chown ubuntu:ubuntu dxlab.sl.nsw.gov.au
```

## Deployment

### Ansible

```
# Deploy staging
$ npm run deploy-staging
# Deploy production
$ npm run deploy-production
```

Try adding your local `id_rsa.pub` to ubuntu user's `.authorized_keys` file if you get a UNREACHABLE error.

Using `now`:

```
# Configuration in .env.now-production
# TODO: Remove now.json?
$ npm run deploy
$ npm run alias-staging # Alias to dxlab-staging.now.sh
# or
$ npm run alias-production # Alias to dxlab.now.sh
# Also need to scale to 1 instance, otherwise instance will be FROZEN after a while
$ now scale dxlab-website-xxxxxxxxxx.now.sh 1
```

#### Issues

Every 5-10 deployments or so, you may run into a `Nginx 500 Internal Error`. It is an issue with the NodeJS process manageer `pm2`. This should be a relatively easy fix:

```
# SSH into the server
$ ssh dxlab-wp
$ cd /srv/www/dxlab.sl.nsw.gov.au/current
$ npx pm2 logs
# You should see - `cannot find module pm2/lib/ProcessContainerFork.js`
# Fix here - https://github.com/Unitech/pm2/issues/1943
$ rm -rf ~/.pm2
$ npm run start-pm2
# Should be up and running@
```

## Hygen generator

To generate a new React component:

```
# Make sure hygen is installed
$ npm i -g hygen
$ hygen component new --name NewComponent
```

## Proxies

Express proxies the following sites:

- dxlab.sl.nsw.gov.au/80hz/
- dxlab.sl.nsw.gov.au/index/
- dxlab.sl.nsw.gov.au/loom/
- dxlab.sl.nsw.gov.au/mainstreet/
- dxlab.sl.nsw.gov.au/meridian/
- dxlab.sl.nsw.gov.au/muruview/
- dxlab.sl.nsw.gov.au/newselfwales/
- dxlab.sl.nsw.gov.au/off-the-shelf/
- dxlab.sl.nsw.gov.au/pano-scope/
- dxlab.sl.nsw.gov.au/portico/
- dxlab.sl.nsw.gov.au/postcards-1001/
- dxlab.sl.nsw.gov.au/search-terms/
- dxlab.sl.nsw.gov.au/weemala/
- dxlab.sl.nsw.gov.au/youngsydney/

Changes to this list are made in /routes/proxyRoutes.js
