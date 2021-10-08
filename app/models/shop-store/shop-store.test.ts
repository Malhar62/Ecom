import { ShopStoreModel } from "./shop-store"

test("can be created", () => {
  const instance = ShopStoreModel.create({})

  expect(instance).toBeTruthy()
})
