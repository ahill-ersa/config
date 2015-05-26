#!/usr/bin/env node

var vault = require('./vault');

vault.process(false, "config", "json", "working", "sh");
