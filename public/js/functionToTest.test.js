// const concatenateStrings = (string1, string2) => {
//   if ("string" === typeof string1 && "string" === typeof string2) {
//     return `${string1} ${string2}`;
//   } else {
//     throw new Error(
//       "Type of parameters do not match required type for arguments string1 and string2",
//     );
//   }
// };

// /public/js/functionToTest.test.js
const concatenateStrings = require("./functionToTest");

describe("concatenateStrings", () => {
  test("devrait concaténer deux chaînes", () => {
    const result = concatenateStrings("Hello, ", "world!");
    expect(result).toBe("Hello, world!");
  });

  test("devrait retourner une chaîne vide si les deux arguments sont vides", () => {
    const result = concatenateStrings("", "");
    expect(result).toBe("");
  });

  test("devrait fonctionner si un argument est une chaîne vide", () => {
    const result = concatenateStrings("Hello", "");
    expect(result).toBe("Hello");
  });
});
