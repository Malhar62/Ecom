import { SecondStoreModel } from "./second-store"

test("can be created", () => {
  const instance = SecondStoreModel.create({})

  expect(instance).toBeTruthy()
})
