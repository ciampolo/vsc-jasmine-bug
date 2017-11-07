//
// PLEASE DO NOT MODIFY / DELETE UNLESS YOU KNOW WHAT YOU ARE DOING
//
// This file is providing the test runner to use when running extension tests.
// By default the test runner in use is Mocha based.
//
// You can provide your own test runner if you want to override it by exporting
// a function run(testRoot: string, clb: (error:Error) => void) that the extension
// host can call to run the tests. The test runner is expected to use console.log
// to report the results back to the caller. When the tests are finished, return
// a possible error to the callback or null if none.
/*
var testRunner = require('vscode/lib/testrunner');

// You can directly control Mocha options by uncommenting the following lines
// See https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options for more info
testRunner.configure({
    ui: 'tdd', 		// the TDD UI is being used in extension.test.ts (suite, test, etc.)
    useColors: true // colored output from test results
});

module.exports = testRunner;*/

import jasmine = require("jasmine")
import * as path from 'path';
import * as glob from 'glob';

// This is a simplified version taken from vscode testrunner
export function run(testsRoot: string, clb: (error, failures?: number) => void): void {
    require("source-map-support").install()

    var jasEnv = new jasmine(null)

    glob("**/**.test.js", { cwd: testsRoot }, (error, files) => {
        if (error) {
            return clb(error)
        }

        try {
            let r: Array<string> = new Array()
            files.forEach(f => r.push(path.join(testsRoot, f)))

            jasEnv.env.clearReporters();
            jasEnv.env.addReporter(new SpecReporter())

            jasEnv.execute(r, null)
        }


        catch (error) {
            return clb(error)
        }
    })
}

import { DisplayProcessor, SpecReporter } from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}
