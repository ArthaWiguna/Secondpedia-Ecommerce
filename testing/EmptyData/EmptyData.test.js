import React from "react";
import renderer from "react-test-renderer";
import EmptyData from "../../src/components/EmptyData.js";

jest.mock("../../src/assets/img/empty-icon.svg", () => {
  return {
    default: "empty-icon.svg",
  };
});

it("renders correctly", () => {
  const tree = renderer.create(<EmptyData />).toJSON();
  expect(tree).toMatchSnapshot();
});
