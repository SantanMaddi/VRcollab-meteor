console.log('in client edit.js');
var verseEditor, styleEditor;
Template.editLayout.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    var metaVerseCodeElement = document.getElementById('meta-verse-code');
    var metaStyleCodeElement = document.getElementById('meta-style-code');
    verseEditor = CodeMirror.fromTextArea(metaVerseCodeElement, {
      mode: "xml",
      width: "100%",
      height: "100%",
      htmlMode: true,
      styleActiveLine: true,
      theme: "mbo"
    });
    styleEditor = CodeMirror.fromTextArea(metaStyleCodeElement, {
      mode: "css",
      width: "100%",
      height: "100%",
      styleActiveLine: true,
      theme: "mbo"
    });
    console.log('Template onLoad');
    run();
  }
}
function run(){
  var metaStyleCode = "<meta-style>" + styleEditor.getValue() + "</meta-style>";
  var metaVerseCode = "<meta-verse>" + metaStyleCode + verseEditor.getValue() + "</meta-verse>";
  var head = '<link rel="import" href="/bower_components/webvr-markup/dist/metaroom-markup.html">' +
              '<script src="/bower_components/webcomponentsjs/webcomponents.js"></script>';
  var resultIframe = document.getElementById('result');
  resultIframe.contentWindow.document.write(metaVerseCode);
  resultIframe.contentWindow.document.close();
  resultIframe.contentWindow.document.head.innerHTML = head;
}
