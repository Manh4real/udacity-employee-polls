import { _saveQuestion } from "../_DATA";

// UNIT TESTS
describe("_saveQuestion", () => {
  it("should return the saved question with all expected fields populated", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion.optionOne.text).toEqual(question.optionOneText);
    expect(savedQuestion.optionTwo.text).toEqual(question.optionTwoText);
    expect(savedQuestion.author).toEqual(question.author);
  });

  it("should return an error if incorrect data is passed", async () => {
    const question = {
      optionOneText: "Option One",
      author: "user123",
    };

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
