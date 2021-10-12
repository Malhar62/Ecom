import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { clothes } from "./clothes"
import { products } from "./products"

/**
 * Model description here for TypeScript hints.
 */
export const ShopStoreModel = types
  .model("ShopStore")
  .props({
    listA: types.optional(types.array(types.frozen()), []),
    listB: types.optional(types.array(types.frozen()), []),
    isLoading: types.optional(types.boolean, false),
    viewed: types.optional(types.array(types.frozen()), []),
    bags: types.optional(types.array(types.frozen()), []),
    favs: types.optional(types.array(types.frozen()), []),
    amount: types.optional(types.number, 0),
    discountedamount: types.optional(types.number, 0),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions(self => ({
    setListB(data: any[]) {
      self.listB.replace(data)
    },
    setListA(data: any[]) {
      self.listA.replace(data)
    },
    countAmount() {
      var count = 0;
      self.bags.forEach(item => {
        if (item.price[0] == '$') {
          var sub = item.price.substr(1)
        } else {
          var sub = item.price
        }
        var temp = item.quantity * sub;
        count = temp + count;
      })
      self.amount = count;
      this.totalAmount()
    },
    totalAmount() {
      var count = 0;
      self.bags.forEach(item => {
        // var temp = item.quantity * item.price;
        // count = temp + count;
        if (item.price[0] == '$') {
          var sub = item.price.substr(1)
        } else {
          var sub = item.price
        }

        if (item.offer) {
          let phoneNumberLength = item.offer == undefined ? 0 : item.offer.length
          var str = []
          for (var i = 0; i < phoneNumberLength; i++) {
            if (item.offer[i] != '%') {
              str.push(item.offer[i])
            } else {
              break;
            }
          }
          var ans = str.join('')
          var number = parseInt(ans, 10);
          var pricefinal = parseInt(sub, 10)
          var pre = (pricefinal * (100 - number)) / 100;
          var temp = item.quantity * Number((pre).toFixed(0));
          console.log(temp)
          count = temp + count;
        } else {
          var temp = item.quantity * sub;
          count = temp + count;
        }
      })
      self.discountedamount = count
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
      console.log('here b')
      const result: any = await self.environment.api.getBList()
      console.log(result.list)
      if (result.kind === "ok") {
        self.setListB(result.list)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    gettingOver: async () => {
      console.log('here a')
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
    },
    addToFav(data: any) {
      self.favs.push(data)
    },
    removeFromFav(Ind: any) {
      self.favs.splice(Ind, 1)
    },
    addToBag(data: any, size: number, delivery: Date) {
      let newObj = {
        ...data, quantity: 1, size, delivery
      }

      var isThere = self.bags.findIndex(x => (x.name == data.name && x.price == data.price && x.size == size))
      if (isThere == -1) {
        self.bags.push(newObj)
      } else {
        self.bags.forEach((item, index) => {
          if (item.name == data.name && item.size == size) {
            let newObj1 = {
              ...data, quantity: self.bags[index].quantity + 1, size, delivery
            }
            self.bags.splice(index, 1, newObj1)
          }
        })
      }
      self.countAmount()
    },
    removeFromBag(Ind: any) {
      self.bags.splice(Ind, 1)
      self.countAmount()
    },
    addQuantity(index: number) {
      let added = {
        ...self.bags[index], quantity: self.bags[index].quantity + 1
      }
      self.bags.splice(index, 1, added)
      self.countAmount()
    },
    removeQuantity(index: number) {
      if (self.bags[index].quantity - 1 != 0) {
        let removed = {
          ...self.bags[index], quantity: self.bags[index].quantity - 1
        }
        self.bags.splice(index, 1, removed)
        self.countAmount()
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
//bgColor": "#BF012C", "brand_name": "PlusS", "id": 3, "img": "https://img.tatacliq.com/images/i3/437Wx649H/MP000000004774937_437Wx649H_20190512205828.jpeg", "name": "PlusS Yellow Printed Below Knee Dress", "offer": "70% Off", "price": 689, "sizes": [6, 7, 8, 9, 10], "type": "women"}
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
