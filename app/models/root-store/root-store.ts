import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ShopStoreModel } from "../shop-store/shop-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { SecondStoreModel } from "../second-store/second-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  shopStore: types.optional(ShopStoreModel, {} as any),
  second: types.optional(SecondStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
