# t1 Documentation

This web application contains all documentation for t1. It was forked from the [Uniswap Docs](https://github.com/Uniswap/docs), and upgraded to use [Docusaurus 3](https://v3.docusaurus.io/), a modern static website generator.

# Project Layout

### t1 documentation currently has two sections:
- Concepts - General t1 information or concepts useful for using t1
- API - xChainRead API documentation

### TODO:
 - Add essential t1 contract docs, including technical method descriptions via `forge doc --serve`
 - ~~Add more research entries in [Research](./docs/concepts/research.md)~~
 - ~~Add all relevant glossary words and definitions in [Glossary](./docs/concepts/glossary.md)~~
 - ~~Replace Lorem Ipsum with actual content in [Protocol](./docs/concepts/protocol)~~
 - ~~Replace links to **Have you ever had a dream** in [index.tsx](./src/pages/index.tsx) with links to codebases (?)~~
 - Add Litepaper (or a link to it) in the NavBar
 - ~~Set up the domain https://docs.t1protocol.com~~
 - ~~Deploy these docs to the world wide web~~
 - ~~Create a job to automatically re-deploy the docs to the world wide web when merge into `main` branch~~
 - ~~Once the link is fixed or the Lorem Ipsum is replaced with real content, remove the `˙` at the end of the title~~
 - ~~Ensure that all linked Github repos are public before sharing link~~

## Adding Documentation

### Overview
A product overview should address points such as:

- What are the high level components of the product?
- What what is the high level functionality the product offers?
- Where does the source code of the product live?
- Where does the code artifact live (eg *npm*) and how does someone integrate with it?

A good example is the [V3 Smart Contracts](./docs/contracts/v3/overview.md).

### Guides
> Guides should follow the **Principles of a Good Guide**:
- A guide corresponds to a reusable piece of code that demonstrates a single concept in the t1 ecosystem.
- Guides have three parts:
    1. An **introduction** that explains the concept that the piece of code implements and a summary of what the guide will cover and result in.
    2. A step-by-step **walkthrough** of each line of the example code 
    3. An **output** or end state that users can test against what they’re seeing to know if they implemented correctly
- Guides do not show source code snippets that should not be included in the example (IE using snippets from a source contract to explain how to integrate with it). If a guide needs to reference an external piece of code it should link to the source code or technical reference.
- We keep Links and References ***only at the bottom*** of pages and reference them using footnotes to **keep distractions at a minimum**
- Our goal is to have the developer build something within **10 minutes per guide** but also provide the option for a deep dive by providing references to extra content.
- Guides should end with a **transition** to the next one, recommendations and real world projects examples
- Each guides should refer to a code example in our example-repo
- Guides should be standalone pieces
- Use the least dependencies as possible
- Input changes (eg address, tokens, amounts) should be in the code

By implementing these consistent principles t1 will have docs that are easy to understand and produce reusable code for its community.


A good example is the [V3 SDK Guides](./docs/sdk/v3/guides/01-quick-start.md).

### Technical References
This should contain the technical reference for the exported interfaces. A good example is the [V3 SDK](./docs/sdk/v3/reference/overview).
These files can be created using the [guides below](#how-to-create-a-technical-reference).

# Contributing to t1 Docs

## Guidelines
Contributing to the docs site is a great way to get involved in the dev community and help other developers along the way! Check out our guidelines [here](./CONTRIBUTING.md).

## Checklist for adding a new product

- Did I pick the right section for the product? 
- Did I create the product folder?
- Did I introduce any new concepts? If so add under */concepts/<category_name><product_name>*
- Did I include an Overview of the product under *<category_name>/<product_name>/overview* ?
- Did I include Guides of the product under *<category_name>/<product_name>/guides* ?
- Did I include Technical Reference of the product under *<category_name>/<product_name>/reference* ?
- Did I give a descriptive name/id to each document? This is important because that shows up in the URL
- Did I open a PR using the the [contributing](./CONTRIBUTING.md) guidelines?
- Did I [update the search indices](#how-to-update-search-indices-with-algolia) after my change was deployed?

## Checklist example

Let's walk through an example by considering the *Permit2* smart contract:
-  Did I pick the right section for the product? 
    - In this case, [contracts](./docs/contracts/) 
- Did I create the product folder? 
    - In this case, [yes](./docs/contracts/permit2/)
- Did I introduce any new concepts? 
    - No
- Did I include an Overview of the product under */contracts/permit2/overview* ?
    - Yes, I did add them [here](./docs/contracts/permit2/overview.md)
- Did I include Guides of the product under *contracts/permit2/guides* ?
    - No, they should be added [here](./docs/contracts/permit2/guides)
- Did I include Technical Reference of the product under *contracts/permit2/reference* ?
    - Yes I added them [here](./docs/contracts/permit2/reference)
- Did I open a PR using the the [Contributing](./CONTRIBUTING.md) guidelines?
    - Yes
- Did I update the search indices after my change was deployed?
    - Yes I did using the [guides below](#how-to-update-search-indices-with-algolia)

# How to create a Technical Reference
## How to generate markdown files from solidity Natspec comments

Install solidity doc gen
`npm install solidity-docgen`

Get the correct compiler version
`npm install -D solc-0.7@npm:solc@0.7.6`

Put the updated template `contract.hbs` in a /templates folder under the same directory as /contracts that you want to generate

Run `npx solidity-docgen --solc-module solc-0.7 -t ./templates`

# How to generate markdown files from typescript comments

`npm install --save-dev typedoc typedoc-plugin-markdown`

Depending on how your project was created, you might have to install Typescript:
`npm install --save-dev typescript`

`npx typedoc --out <docs> src/index.ts`

You might have to use the `--skipErrorChecking` flag to the `typedoc` command for cases where types are fetched during transpile time, such as contract ABIs.

See https://www.npmjs.com/package/typedoc-plugin-markdown for details.

## Installation

```console
yarn install
```

## Local Development

```console
yarn run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Clear cache

```console
yarn docusaurus clear
```

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.