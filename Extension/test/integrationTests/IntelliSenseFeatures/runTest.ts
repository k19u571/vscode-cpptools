import * as path from 'path';

import { runTests } from 'vscode-test';

async function main() {
    try {
        console.log("__dirname: " + __dirname);
        
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../../../');
        console.log("extensionDevelopmentPath: " + extensionDevelopmentPath);

        // The path to the extension test script
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './index');

        let extensionPath: string | undefined = process.env.EXTENSIONS_PATH;
        if (!extensionPath) {
            console.error("Unable to read process.env.EXTENSIONS_PATH");
        } else {
            console.log("extensionPath: " + extensionPath);
        }

        // Note, when running tests locally, replace testWorkspace with local path to "~/Vcls-vscode-test/SingleRootProject"
        let testWorkspace: string | undefined = process.env.TESTS_WORKSPACE;
        if (!testWorkspace) {
            console.error("Unable to read process.env.TESTS_WORKSPACE");
        } else {
            console.log("testWorkspace: " + testWorkspace);
        }

        const launchArgs = [ testWorkspace, "--disable-extensions" ];

        // Download VS Code, unzip it and run the integration test
        await runTests({ launchArgs, extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
