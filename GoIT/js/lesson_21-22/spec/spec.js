var jq = require('../node_modules/jquery/dist/jquery.min.js');
var app = require('../js/script.js');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
    console.log('app.questions.length', app.questions.length);
  });
});