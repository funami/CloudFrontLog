var calculator = require("../lib/calculator");
 
describe("multiplication", function () {
  it("should multiply 2 and 3", function () {
    var product = calculator.multiply(2, 3);
    expect(product).toBe(6);
  });
  it("should multiply 3 and 3", function () {
    var product = calculator.multiply(3, 3);
    expect(product).toBe(9);
  });
  it("should multiply 1 and 3", function () {
    var product = calculator.multiply(1, 3);
    expect(product).toBe(3);
  });
  it("should plus 1 to 3", function () {
    var product = calculator.plus(1, 3);
    expect(product).toBe(4);
  });
});   
