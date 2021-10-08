import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { product } from "ramda"
import { Api } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"
import { clothes } from "./clothes"
import { products } from "./products"

/**
 * Model description here for TypeScript hints.
 */
export const ShopStoreModel = types
  .model("ShopStore")
  .props({
    listA: types.optional(types.array(types.frozen()), products),
    listB: types.optional(types.array(types.frozen()), clothes),
    isLoading: types.optional(types.boolean, false),
    viewed: types.optional(types.array(types.frozen()), []),
    bags: types.optional(types.array(types.frozen()), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions(self => ({
    setListB(data: any[]) {
      self.listB.replace(data)
    },
    setListA(data: any[]) {
      self.listA.replace(data)
    }
  }))
  .actions((self) => ({
    // gettingOver: flow(function* gettingOver() {
    //   try {
    //     const res = yield self.environment.api.getAList()
    //     if (res) {
    //       self.setListA(res)
    //       return { response: true, message: "Success." };
    //     }
    //     else {
    //       return { response: false, message: "Something went wrong." };
    //     }
    //   } catch (error) {
    //     return { response: false, message: "Something went wrong." };
    //   }
    // }),
    getOver: async () => {
      const result: any = await self.environment.api.getBList()
      console.log(result.list)
      if (result.kind === "ok") {
        self.setListB(result.list)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    gettingOver: async () => {
      console.log('here')
      const result: any = await self.environment.api.getAList()
      console.log(result.list)
      if (result.kind === "ok") {
        self.setListA(result.list)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    addToViewed(data: any) {
      self.viewed.forEach((item, index) => {
        if (data.name == item.name && data.price == item.price) {
          self.viewed.splice(index, 1)
        }
      })
      self.viewed.push(data)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ShopStoreType = Instance<typeof ShopStoreModel>
export interface ShopStore extends ShopStoreType { }
type ShopStoreSnapshotType = SnapshotOut<typeof ShopStoreModel>
export interface ShopStoreSnapshot extends ShopStoreSnapshotType { }
export const createShopStoreDefaultModel = () => types.optional(ShopStoreModel, {})
