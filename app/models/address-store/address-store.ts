import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AddressStoreModel = types
  .model("AddressStore")
  .props({
    addresses: types.optional(types.array(types.frozen()), []),
    defaultAddress: types.optional(types.frozen(), {})
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addAddress(data: any) {
      self.addresses.push(data)
    },
    removeAddress(index: any) {
      self.addresses.splice(index, 1)
    },
    editAddress(data: any, ind: number) {
      self.addresses.splice(ind, 1, data)
    },
    makeDefault(data: any) {
      self.defaultAddress = data
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AddressStoreType = Instance<typeof AddressStoreModel>
export interface AddressStore extends AddressStoreType { }
type AddressStoreSnapshotType = SnapshotOut<typeof AddressStoreModel>
export interface AddressStoreSnapshot extends AddressStoreSnapshotType { }
export const createAddressStoreDefaultModel = () => types.optional(AddressStoreModel, {})
