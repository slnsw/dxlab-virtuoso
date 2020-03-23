# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.2] - 2020-03-23

- Fix `Link` bug

## [1.7.1] - 2020-03-13

- Fix CSS transition issues
- Update `now.staging.json` and `now.json`

## [1.7.0] - 2020-03-11

- Update to `next` 9.3.0
- Update all packages including `react`, `apollo` and `next`
- Update all pages to use `withApollo` higher order component
- Switch to Node 10.16.3
- Remove `flow` references
- Add `stylelint-config-rational-order` for peak OCD
- Add `@testing-library/react`
- Deprecate use of `server.js` and `next-routes` in favour of `next`'s dynamic routes feature
- Migrate towards Zeit Now for deployments, adding all rewrites and redirects into `now.json`

## [1.6.1] - 2020-03-03

- Add `ansible` scripts to deploy to EC2 server
- Update `package.json` script with option to deploy with `ansible`
- Add kids audio guide proxy

## [1.6.0] - 2019-11-05

- Add this changelog (sorry, better late than never)
- Add `off-the-shelf` proxy
