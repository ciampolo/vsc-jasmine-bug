import { commands, workspace, ViewColumn, Uri } from "vscode";

describe("toplevel", function () {
    it("should be able to play a song", function () {
        let Player = "test1"
        expect(Player).toEqual("test1")
        let registration = workspace.registerTextDocumentContentProvider('speciale', {
            provideTextDocumentContent(uri) {
                return `content of URI <b>${uri.toString()}</b>`;
            }
        });

        let virtualDocumentUri = Uri.parse('speciale://authority/path');
        let title = 'A title';

        return commands.executeCommand('vscode.previewHtml', virtualDocumentUri, ViewColumn.Three, title).then(() => {
            registration.dispose();
        });
    })
})