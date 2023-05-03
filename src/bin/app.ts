#!/usr/bin/env node

import { argv } from "node:process";
import { List } from "immutable";
import { main } from "../ui";

main(List(argv).skip(2))
  .then(() => {
    console.info("Project generated successfully");
  })
  .catch(err => {
    console.error(err);
  });
