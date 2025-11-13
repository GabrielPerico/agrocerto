const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable package exports to avoid runtime issues
config.resolver.unstable_enablePackageExports = false;

// Ensure proper watchFolders for monorepo
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
config.watchFolders = [projectRoot, monorepoRoot];

// Add node_modules resolution
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
