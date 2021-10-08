import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetList } from "./api.types"


export class ShopApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async getCharacters(): Promise<GetList> {
        try {
            // make the api call
            const response: ApiResponse<any> = await this.api.apisauce.get('https://api.npoint.io/68cb83657d7616957c3f')
            console.log(response)
            // the typical ways to die when calling an api
            if (!response.ok) {
                const problem = getGeneralApiProblem(response)
                if (problem) return problem
            }

            const characters = response.data

            return { kind: "ok", list: characters, status: response.status }
        } catch (e) {
            __DEV__ && console.tron.log(e.message)
            return { kind: "bad-data" }
        }
    }
}