import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ShopApi } from "../../services/api/shop-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const SecondStoreModel = types
  .model("SecondStore")
  .props({
    lists: types.optional(types.array(types.frozen()), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions(self => ({
    setList(data) {
      self.lists.replace(data)
    }
  }))
  .actions((self) => ({
    getCharacters: async () => {
      const characterApi = new ShopApi(self.environment.api)
      const result = await characterApi.getCharacters()

      if (result.kind === "ok") {
        self.setList(result.list)
        console.log(result.list)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type SecondStoreType = Instance<typeof SecondStoreModel>
export interface SecondStore extends SecondStoreType { }
type SecondStoreSnapshotType = SnapshotOut<typeof SecondStoreModel>
export interface SecondStoreSnapshot extends SecondStoreSnapshotType { }
export const createSecondStoreDefaultModel = () => types.optional(SecondStoreModel, {})
