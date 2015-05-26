#!/usr/bin/env node

var vault = require('./vault');

vault.process(true, "working", "sh", "config", "json");
